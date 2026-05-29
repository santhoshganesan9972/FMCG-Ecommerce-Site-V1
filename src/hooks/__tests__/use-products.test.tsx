// @vitest-environment jsdom
// ── useProducts Hook Tests ───────────────────────────────────

import { vi } from "vitest";

const mockProductService = vi.hoisted(() => ({
  getProducts: vi.fn(),
  getProductById: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getPricingData: vi.fn(),
  updatePricing: vi.fn(),
  getProductMedia: vi.fn(),
  deleteMedia: vi.fn(),
  setPrimaryMedia: vi.fn(),
  getProductSEO: vi.fn(),
  updateProductSEO: vi.fn(),
  getBulkUploadHistory: vi.fn(),
  uploadBulkFile: vi.fn(),
  getAuditLogs: vi.fn(),
}));

const mockCategoryService = vi.hoisted(() => ({
  getCategories: vi.fn(),
  getCategoryById: vi.fn(),
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  deleteCategory: vi.fn(),
}));

vi.mock("@/services/products.service", () => ({
  productService: mockProductService,
  categoryService: mockCategoryService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import {
  useProducts, useProduct, useProductForm, useCategories,
  usePricing, useProductMedia, useProductSEO, useBulkUpload, useAuditLogs,
} from "@/hooks/use-products";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

const mockProductsPage = {
  products: [
    { id: "p-1", name: "Milk", sku: "MLK-001", price: 50, mrp: 55, category: "Dairy", status: "active", stock: 100 },
    { id: "p-2", name: "Bread", sku: "BRD-001", price: 35, mrp: 40, category: "Bakery", status: "active", stock: 80 },
  ],
  pagination: { page: 1, pageSize: 10, total: 2 },
};

describe("useProducts", () => {
  it("returns loading state initially", () => {
    mockProductService.getProducts.mockReturnValue(new Promise(() => {}));
    const { result } = renderWithQuery(() => useProducts());
    expect(result.current.loading).toBe(true);
  });

  it("returns products on success", async () => {
    mockProductService.getProducts.mockResolvedValue(mockProductsPage);
    const { result } = renderWithQuery(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toHaveLength(2);
    expect(result.current.pagination.total).toBe(2);
  });

  it("returns error on failure", async () => {
    mockProductService.getProducts.mockRejectedValue(new Error("Products API error"));
    const { result } = renderWithQuery(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Products API error");
    expect(result.current.products).toEqual([]);
  });

  it("updateFilters resets page to 1", async () => {
    mockProductService.getProducts.mockResolvedValue(mockProductsPage);
    const { result } = renderWithQuery(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.setPage(3));
    expect(result.current.pagination.page).toBe(3);

    act(() => result.current.updateFilters({ category: "Dairy" }));
    expect(result.current.pagination.page).toBe(1);
  });

  it("clearFilters resets all filters", async () => {
    mockProductService.getProducts.mockResolvedValue(mockProductsPage);
    const { result } = renderWithQuery(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.updateFilters({ category: "Dairy", search: "milk" }));
    act(() => result.current.clearFilters());

    expect(result.current.filters.search).toBe("");
    expect(result.current.filters.category).toBe("");
    expect(result.current.filters.status).toBe("");
  });
});

describe("useProduct", () => {
  const mockProduct = mockProductsPage.products[0];

  it("returns product on success", async () => {
    mockProductService.getProductById.mockResolvedValue(mockProduct);
    const { result } = renderWithQuery(() => useProduct("p-1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product?.name).toBe("Milk");
    expect(result.current.error).toBeNull();
  });

  it("returns error when product not found", async () => {
    mockProductService.getProductById.mockResolvedValue(null);
    const { result } = renderWithQuery(() => useProduct("p-999"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toBeNull();
  });
});

describe("useProductForm", () => {
  it("createProduct succeeds", async () => {
    mockProductService.createProduct.mockResolvedValue({ id: "p-new", name: "Cheese" });
    const { result } = renderWithQuery(() => useProductForm());

    const product = await result.current.createProduct({ name: "Cheese", price: 100 });
    expect(product?.name).toBe("Cheese");
  });

  it("createProduct returns null on failure", async () => {
    mockProductService.createProduct.mockRejectedValue(new Error("Create failed"));
    const { result } = renderWithQuery(() => useProductForm());

    const product = await result.current.createProduct({ name: "Cheese" });
    expect(product).toBeNull();
  });

  it("updateProduct succeeds", async () => {
    mockProductService.updateProduct.mockResolvedValue({ id: "p-1", name: "Milk Updated" });
    const { result } = renderWithQuery(() => useProductForm());

    const product = await result.current.updateProduct("p-1", { name: "Milk Updated" });
    expect(product?.name).toBe("Milk Updated");
  });

  it("deleteProduct succeeds", async () => {
    mockProductService.deleteProduct.mockResolvedValue(true);
    const { result } = renderWithQuery(() => useProductForm());

    const success = await result.current.deleteProduct("p-1");
    expect(success).toBe(true);
  });

  it("deleteProduct returns false on failure", async () => {
    mockProductService.deleteProduct.mockRejectedValue(new Error("Delete failed"));
    const { result } = renderWithQuery(() => useProductForm());

    const success = await result.current.deleteProduct("p-1");
    expect(success).toBe(false);
  });
});

describe("useCategories", () => {
  it("returns categories", async () => {
    mockCategoryService.getCategories.mockResolvedValue([
      { id: "c-1", name: "Dairy", productCount: 20 },
      { id: "c-2", name: "Bakery", productCount: 15 },
    ]);
    const { result } = renderWithQuery(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toHaveLength(2);
    expect(result.current.categoryOptions).toHaveLength(2);
  });
});

describe("usePricing", () => {
  it("returns pricing data", async () => {
    mockProductService.getPricingData.mockResolvedValue([
      { id: "p-1", name: "Milk", sku: "MLK-001", price: 50, mrp: 55, cost: 40, margin: 20, tax: 5 },
    ]);
    const { result } = renderWithQuery(() => usePricing());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.pricingData).toHaveLength(1);
  });
});

describe("useProductMedia", () => {
  it("returns media items", async () => {
    mockProductService.getProductMedia.mockResolvedValue([
      { id: "m-1", productId: "p-1", productName: "Milk", type: "image", url: "/img.jpg", alt: "Milk", isPrimary: true, uploadedAt: "2025-05-28T10:00:00Z" },
    ]);
    const { result } = renderWithQuery(() => useProductMedia());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.mediaItems).toHaveLength(1);
  });
});

describe("useProductSEO", () => {
  it("returns SEO items", async () => {
    mockProductService.getProductSEO.mockResolvedValue([
      { productId: "p-1", productName: "Milk", sku: "MLK-001", metaTitle: "Fresh Milk", metaDescription: "Fresh milk delivered", metaKeywords: ["milk", "fresh"], slug: "fresh-milk", ogImage: "/og.jpg" },
    ]);
    const { result } = renderWithQuery(() => useProductSEO());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.seoItems).toHaveLength(1);
  });
});

describe("useBulkUpload", () => {
  it("returns upload history", async () => {
    mockProductService.getBulkUploadHistory.mockResolvedValue([
      { id: "bu-1", fileName: "products.csv", status: "completed", total: 100, success: 95, failed: 5, uploadedAt: "2025-05-28T10:00:00Z" },
    ]);
    const { result } = renderWithQuery(() => useBulkUpload());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.records).toHaveLength(1);
  });
});

describe("useAuditLogs", () => {
  it("returns audit logs with pagination", async () => {
    mockProductService.getAuditLogs.mockResolvedValue({
      logs: [{ id: "log-1", action: "update", product: "Milk", productId: "p-1", field: "price", oldValue: "45", newValue: "50", performedBy: "Admin", role: "super_admin", timestamp: "2025-05-28T10:00:00Z" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useAuditLogs());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.pagination.total).toBe(1);
  });
});
