// ── Products API Adapter Tests ──────────────────────────────
// Tests products CRUD, pricing, media, SEO, bulk upload,
// audit logs, and categories.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockDelete,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as productsApi from "../products.api";

beforeEach(() => resetMocks());

// ── Products CRUD ──────────────────────────────────────────

describe("getProducts", () => {
  const mockProducts = [
    { id: "1", name: "Product A", sku: "SKU001", price: 100, status: "active" },
  ];

  it("returns paginated products on success", async () => {
    const response = { success: true, data: mockProducts, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await productsApi.getProducts({ category: "food" }, { page: 1, pageSize: 10, total: 0 });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/products", {
      params: { category: "food", page: 1, size: 10 },
    });
  });

  it("returns paginated error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load products"));

    const result = await productsApi.getProducts();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.meta).toBeDefined();
  });
});

describe("getProductById", () => {
  it("returns a product on success", async () => {
    const product = { id: "1", name: "Product A" };
    const response = { success: true, data: product };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await productsApi.getProductById("1");

    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Product A");
    expect(mockGet).toHaveBeenCalledWith("/v1/products/1");
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Product not found"));

    const result = await productsApi.getProductById("999");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Product not found");
  });
});

describe("createProduct", () => {
  it("creates a product on success", async () => {
    const newProduct = { id: "3", name: "New Product" };
    const response = { success: true, data: newProduct };
    mockPost.mockResolvedValue(mockSuccessResponse(response));

    const result = await productsApi.createProduct({ name: "New Product", price: 50 });

    expect(result.success).toBe(true);
    expect(result.data.id).toBe("3");
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/products", { name: "New Product", price: 50 });
  });

  it("returns error on failure", async () => {
    mockPost.mockRejectedValue(new Error("Failed to create product"));

    const result = await productsApi.createProduct({ name: "Fail" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to create product");
  });
});

describe("updateProduct", () => {
  it("updates a product on success", async () => {
    const updated = { id: "1", name: "Updated" };
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: updated }));

    const result = await productsApi.updateProduct("1", { name: "Updated" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/products/1", { name: "Updated" });
  });
});

describe("deleteProduct", () => {
  it("deletes a product on success", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await productsApi.deleteProduct("1");

    expect(result.success).toBe(true);
    expect(result.data).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith("/v1/admin/products/1");
  });

  it("returns error on failure", async () => {
    mockDelete.mockRejectedValue(new Error("Failed to delete product"));

    const result = await productsApi.deleteProduct("1");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to delete product");
  });
});

// ── Pricing ─────────────────────────────────────────────────

describe("pricing", () => {
  it("getPricingData returns pricing list", async () => {
    const pricing = [{ id: "1", name: "P1", sku: "S1", price: 100, mrp: 120, cost: 80, margin: 33, tax: 18 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: pricing }));

    const result = await productsApi.getPricingData("search-term");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/products/pricing", {
      params: { search: "search-term" },
    });
  });

  it("updatePricing updates pricing on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await productsApi.updatePricing("1", { price: 110, mrp: 130 });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/products/1/pricing", { price: 110, mrp: 130 });
  });
});

// ── Media ───────────────────────────────────────────────────

describe("media", () => {
  it("getProductMedia returns media items", async () => {
    const media = [{ id: "m1", productId: "1", productName: "P1", type: "image", url: "/img.jpg", alt: "Image", isPrimary: true, uploadedAt: "2024-01-01" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: media }));

    const result = await productsApi.getProductMedia();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/products/media", { params: undefined });
  });

  it("deleteMedia deletes media", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await productsApi.deleteMedia("m1");

    expect(result.success).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith("/v1/admin/products/media/m1");
  });

  it("setPrimaryMedia sets primary", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await productsApi.setPrimaryMedia("m1");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/products/media/m1/primary");
  });
});

// ── SEO ─────────────────────────────────────────────────────

describe("SEO", () => {
  it("getProductSEO returns SEO data", async () => {
    const seo = [{ productId: "1", productName: "P1", sku: "S1", metaTitle: "Title", metaDescription: "Desc", metaKeywords: ["kw"], slug: "p1", ogImage: "/img.jpg" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: seo }));

    const result = await productsApi.getProductSEO();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/products/seo", { params: undefined });
  });

  it("updateProductSEO updates SEO", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await productsApi.updateProductSEO("1", { metaTitle: "New Title" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/products/1/seo", { metaTitle: "New Title" });
  });
});

// ── Bulk Upload ─────────────────────────────────────────────

describe("bulk upload", () => {
  it("getBulkUploadHistory returns history", async () => {
    const history = [{ id: "b1", fileName: "import.csv", status: "completed", uploadedAt: "2024-01-01", totalRows: 100, successRows: 95, failedRows: 5 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: history }));

    const result = await productsApi.getBulkUploadHistory();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/products/bulk-uploads");
  });

  it("uploadBulkFile uses FormData", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: { jobId: "j1" } }));
    const file = new File(["data"], "test.csv", { type: "text/csv" });

    const result = await productsApi.uploadBulkFile(file);

    expect(result.success).toBe(true);
    expect(result.data.jobId).toBe("j1");
    expect(mockPost).toHaveBeenCalledWith(
      "/v1/admin/products/import",
      expect.any(FormData),
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  });
});

// ── Audit Logs ──────────────────────────────────────────────

describe("getAuditLogs", () => {
  it("returns audit logs on success", async () => {
    const logs = [{ id: "a1", action: "UPDATE", product: "P1", productId: "1", field: "price", oldValue: "100", newValue: "120", performedBy: "Admin", role: "admin", timestamp: "2024-01-01" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: logs }));

    const result = await productsApi.getAuditLogs({ action: "UPDATE" }, { page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load audit logs"));

    const result = await productsApi.getAuditLogs();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load audit logs");
  });
});

// ── Categories ──────────────────────────────────────────────

describe("categories", () => {
  it("getCategories returns categories", async () => {
    const categories = [{ id: "c1", name: "Beverages", slug: "beverages" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: categories }));

    const result = await productsApi.getCategories();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/categories");
  });

  it("getCategoryById returns a category", async () => {
    const category = { id: "c1", name: "Beverages" };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: category }));

    const result = await productsApi.getCategoryById("c1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/categories/c1");
  });

  it("createCategory creates a category", async () => {
    const created = { id: "c2", name: "Snacks" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: created }));

    const result = await productsApi.createCategory({ name: "Snacks" });

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/categories", { name: "Snacks" });
  });

  it("updateCategory updates a category", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "c1", name: "Updated" } }));

    const result = await productsApi.updateCategory("c1", { name: "Updated" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/categories/c1", { name: "Updated" });
  });

  it("deleteCategory deletes a category", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await productsApi.deleteCategory("c1");

    expect(result.success).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith("/v1/admin/categories/c1");
  });
});
