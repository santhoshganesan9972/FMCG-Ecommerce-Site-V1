// ── Products Service Tests ──────────────────────────────────
// Tests the service layer for products, categories, pricing,
// media, SEO, bulk upload, and audit logs.

import { describe, it, expect, beforeEach } from "vitest";
import { mockProductsApi, resetMocks } from "./setup";
import { productService, categoryService } from "../products.service";

beforeEach(() => resetMocks());

// ── Mock Data ───────────────────────────────────────────────

const mockProduct = { id: "1", name: "Product A", sku: "SKU001", price: 100, status: "active" as const };
const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };

// ── getProducts ─────────────────────────────────────────────

describe("getProducts", () => {
  it("unwraps paginated response on success", async () => {
    mockProductsApi.getProducts.mockResolvedValue({
      success: true,
      data: [mockProduct],
      meta: mockMeta,
    });

    const result = await productService.getProducts({ category: "food" }, { page: 1, pageSize: 10 });

    expect(result.products).toEqual([mockProduct]);
    expect(result.pagination).toEqual({ page: 1, pageSize: 10, total: 1 });
    expect(mockProductsApi.getProducts).toHaveBeenCalledWith(
      { category: "food" },
      { page: 1, pageSize: 10 },
    );
  });

  it("uses defaults when no args provided", async () => {
    mockProductsApi.getProducts.mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    });

    const result = await productService.getProducts();

    expect(result.products).toEqual([]);
    expect(result.pagination.total).toBe(0);
  });
});

// ── getProductById ───────────────────────────────────────────

describe("getProductById", () => {
  it("returns product data on success", async () => {
    mockProductsApi.getProductById.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const result = await productService.getProductById("1");

    expect(result).toEqual(mockProduct);
    expect(mockProductsApi.getProductById).toHaveBeenCalledWith("1");
  });

  it("returns undefined when data is undefined", async () => {
    mockProductsApi.getProductById.mockResolvedValue({
      success: false,
      data: undefined,
      error: "Product not found",
    });

    const result = await productService.getProductById("999");

    expect(result).toBeUndefined();
  });
});

// ── createProduct ────────────────────────────────────────────

describe("createProduct", () => {
  it("returns created product on success", async () => {
    const newProduct = { id: "3", name: "New Product", sku: "SKU003", price: 50, status: "active" as const };
    mockProductsApi.createProduct.mockResolvedValue({
      success: true,
      data: newProduct,
    });

    const result = await productService.createProduct({ name: "New Product", price: 50 });

    expect(result).toEqual(newProduct);
    expect(mockProductsApi.createProduct).toHaveBeenCalledWith({ name: "New Product", price: 50 });
  });
});

// ── updateProduct ────────────────────────────────────────────

describe("updateProduct", () => {
  it("returns updated product on success", async () => {
    const updated = { ...mockProduct, name: "Updated" };
    mockProductsApi.updateProduct.mockResolvedValue({
      success: true,
      data: updated,
    });

    const result = await productService.updateProduct("1", { name: "Updated" });

    expect(result?.name).toBe("Updated");
  });
});

// ── deleteProduct ────────────────────────────────────────────

describe("deleteProduct", () => {
  it("returns true on success", async () => {
    mockProductsApi.deleteProduct.mockResolvedValue({
      success: true,
      data: true,
    });

    const result = await productService.deleteProduct("1");

    expect(result).toBe(true);
  });

  it("returns false on failure", async () => {
    mockProductsApi.deleteProduct.mockResolvedValue({
      success: false,
      data: false,
      error: "Failed to delete",
    });

    const result = await productService.deleteProduct("1");

    expect(result).toBe(false);
  });
});

// ── getPricingData ──────────────────────────────────────────

describe("getPricingData", () => {
  it("returns pricing data on success", async () => {
    const pricing = [{ id: "1", name: "P1", sku: "S1", price: 100, mrp: 120, cost: 80, margin: 33, tax: 18 }];
    mockProductsApi.getPricingData.mockResolvedValue({
      success: true,
      data: pricing,
    });

    const result = await productService.getPricingData("search-term");

    expect(result).toEqual(pricing);
    expect(mockProductsApi.getPricingData).toHaveBeenCalledWith("search-term");
  });

  it("returns empty array when search is undefined", async () => {
    mockProductsApi.getPricingData.mockResolvedValue({
      success: true,
      data: [],
    });

    const result = await productService.getPricingData();

    expect(result).toEqual([]);
  });
});

// ── updatePricing ───────────────────────────────────────────

describe("updatePricing", () => {
  it("returns true on success", async () => {
    mockProductsApi.updatePricing.mockResolvedValue({
      success: true,
      data: true,
    });

    const result = await productService.updatePricing("1", { price: 110 });

    expect(result).toBe(true);
  });
});

// ── Product Media ───────────────────────────────────────────

describe("product media", () => {
  it("getProductMedia returns media list", async () => {
    const media = [{ id: "m1", productId: "1", productName: "P1", type: "image" as const, url: "/img.jpg", alt: "Image", isPrimary: true, uploadedAt: "2024-01-01" }];
    mockProductsApi.getProductMedia.mockResolvedValue({ success: true, data: media });

    const result = await productService.getProductMedia();

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("image");
  });

  it("deleteMedia returns success boolean", async () => {
    mockProductsApi.deleteMedia.mockResolvedValue({ success: true, data: true });
    expect(await productService.deleteMedia("m1")).toBe(true);
  });

  it("setPrimaryMedia returns success boolean", async () => {
    mockProductsApi.setPrimaryMedia.mockResolvedValue({ success: true, data: true });
    expect(await productService.setPrimaryMedia("m1")).toBe(true);
  });
});

// ── Product SEO ────────────────────────────────────────────

describe("product SEO", () => {
  it("getProductSEO returns SEO list", async () => {
    const seo = [{ productId: "1", productName: "P1", sku: "S1", metaTitle: "Title", metaDescription: "Desc", metaKeywords: ["kw"], slug: "p1", ogImage: "/img.jpg" }];
    mockProductsApi.getProductSEO.mockResolvedValue({ success: true, data: seo });

    const result = await productService.getProductSEO();

    expect(result).toHaveLength(1);
    expect(result[0].metaTitle).toBe("Title");
  });

  it("updateProductSEO returns success boolean", async () => {
    mockProductsApi.updateProductSEO.mockResolvedValue({ success: true, data: true });

    const result = await productService.updateProductSEO("1", { metaTitle: "New Title" });

    expect(result).toBe(true);
    expect(mockProductsApi.updateProductSEO).toHaveBeenCalledWith("1", { metaTitle: "New Title" });
  });
});

// ── Bulk Upload ─────────────────────────────────────────────

describe("bulk upload", () => {
  it("getBulkUploadHistory returns history", async () => {
    const history = [{ id: "b1", fileName: "import.csv", status: "completed" as const, uploadedAt: "2024-01-01", totalRows: 100, successRows: 95, failedRows: 5 }];
    mockProductsApi.getBulkUploadHistory.mockResolvedValue({ success: true, data: history });

    const result = await productService.getBulkUploadHistory();

    expect(result).toHaveLength(1);
    expect(result[0].fileName).toBe("import.csv");
  });

  it("uploadBulkFile returns success and jobId", async () => {
    mockProductsApi.uploadBulkFile.mockResolvedValue({ success: true, data: { jobId: "j1" } });
    const file = new File(["data"], "test.csv", { type: "text/csv" });

    const result = await productService.uploadBulkFile(file);

    expect(result.success).toBe(true);
    expect(result.jobId).toBe("j1");
    expect(mockProductsApi.uploadBulkFile).toHaveBeenCalledWith(file);
  });
});

// ── Audit Logs ──────────────────────────────────────────────

describe("getAuditLogs", () => {
  it("unwraps paginated audit logs", async () => {
    const logs = [{ id: "a1", action: "UPDATE", product: "P1", productId: "1", field: "price", oldValue: "100", newValue: "120", performedBy: "Admin", role: "admin", timestamp: "2024-01-01" }];
    mockProductsApi.getAuditLogs.mockResolvedValue({
      success: true,
      data: logs,
      meta: mockMeta,
    });

    const result = await productService.getAuditLogs({ action: "UPDATE" }, { page: 1, pageSize: 10 });

    expect(result.logs).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
  });

  it("provides fallback pagination when meta is missing", async () => {
    mockProductsApi.getAuditLogs.mockResolvedValue({ success: true, data: [] });

    const result = await productService.getAuditLogs();

    expect(result.logs).toEqual([]);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.total).toBe(0);
  });
});

// ── Categories ──────────────────────────────────────────────

describe("categoryService", () => {
  it("getCategories returns categories", async () => {
    const categories = [{ id: "c1", name: "Beverages", slug: "beverages" }];
    mockProductsApi.getCategories.mockResolvedValue({ success: true, data: categories });

    const result = await categoryService.getCategories();

    expect(result).toEqual(categories);
  });

  it("getCategoryById returns a category", async () => {
    const category = { id: "c1", name: "Beverages" };
    mockProductsApi.getCategoryById.mockResolvedValue({ success: true, data: category });

    const result = await categoryService.getCategoryById("c1");

    expect(result?.name).toBe("Beverages");
  });

  it("createCategory returns created category", async () => {
    const created = { id: "c2", name: "Snacks" };
    mockProductsApi.createCategory.mockResolvedValue({ success: true, data: created });

    const result = await categoryService.createCategory({ name: "Snacks" });

    expect(result.id).toBe("c2");
  });

  it("updateCategory returns updated category", async () => {
    mockProductsApi.updateCategory.mockResolvedValue({ success: true, data: { id: "c1", name: "Updated" } });

    const result = await categoryService.updateCategory("c1", { name: "Updated" });

    expect(result?.name).toBe("Updated");
  });

  it("deleteCategory returns boolean", async () => {
    mockProductsApi.deleteCategory.mockResolvedValue({ success: true, data: true });

    const result = await categoryService.deleteCategory("c1");

    expect(result).toBe(true);
  });
});
