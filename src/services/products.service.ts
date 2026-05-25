import type {
  Product,
  ProductFilters,
  ProductCategory,
  ProductStatus,
  BulkUploadRecord,
  Category,
  PaginationState,
} from "@/types/products";
import { mockAdminProducts, mockBulkUploadHistory } from "@/data/admin/products";

// ── Product Service ───────────────────────────────────────

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function filterByStock(product: Product, stockStatus: string): boolean {
  if (stockStatus === "in_stock") return product.stock > product.lowStockThreshold;
  if (stockStatus === "low_stock") return product.stock > 0 && product.stock <= product.lowStockThreshold;
  if (stockStatus === "out_of_stock") return product.stock === 0;
  return true;
}

export const productService = {
  async getProducts(
    filters: Partial<ProductFilters> = {},
    pagination: Partial<PaginationState> = { page: 1, pageSize: 10 }
  ): Promise<{ products: Product[]; pagination: PaginationState }> {
    await delay(200);

    let filtered = [...mockAdminProducts] as Product[];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.toLowerCase().includes(q)
      );
    }
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters.stockStatus) {
      filtered = filtered.filter((p) => filterByStock(p, filters.stockStatus!));
    }
    if (filters.brand) {
      filtered = filtered.filter((p) =>
        p.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[filters.sortBy! as keyof Product] as string | number;
        const bVal = b[filters.sortBy! as keyof Product] as string | number;
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return filters.sortOrder === "desc" ? -cmp : cmp;
      });
    }

    const total = filtered.length;
    const page = pagination.page || 1;
    const pageSize = pagination.pageSize || 10;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      products: paged,
      pagination: { page, pageSize, total },
    };
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay(150);
    return (mockAdminProducts as Product[]).find((p) => p.id === id);
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    await delay(400);
    const newProduct: Product = {
      id: `PRD-${String(mockAdminProducts.length + 1).padStart(3, "0")}`,
      name: data.name || "",
      sku: data.sku || "",
      barcode: data.barcode || "",
      category: (data.category || "Groceries") as ProductCategory,
      brand: data.brand || "",
      price: data.price || 0,
      costPrice: data.costPrice || 0,
      mrp: data.mrp || 0,
      taxRate: data.taxRate || 5,
      unit: data.unit || "piece",
      weight: data.weight || "",
      stock: data.stock || 0,
      lowStockThreshold: data.lowStockThreshold || 10,
      status: (data.status || "draft") as ProductStatus,
      description: data.description || "",
      shortDescription: data.shortDescription || "",
      tags: data.tags || [],
      warehouse: data.warehouse || "",
      supplier: data.supplier || "",
      variants: data.variants || [],
      media: data.media || [],
      seo: data.seo || {
        productId: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: [],
        slug: "",
        canonicalUrl: "",
        ogImage: "",
      },
      history: [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    newProduct.seo.productId = newProduct.id;
    return newProduct;
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
    await delay(300);
    const product = (mockAdminProducts as Product[]).find((p) => p.id === id);
    if (!product) return undefined;
    return { ...product, ...data, updatedAt: new Date().toISOString().split("T")[0] };
  },

  async deleteProduct(id: string): Promise<boolean> {
    await delay(200);
    return true;
  },

  async getBulkUploadHistory(): Promise<BulkUploadRecord[]> {
    await delay(200);
    return mockBulkUploadHistory as BulkUploadRecord[];
  },
};

// ── Category Service ──────────────────────────────────────

const mockCategories: Category[] = [
  { id: "CAT-001", name: "Groceries", slug: "groceries", description: "Daily grocery essentials", parentId: null, image: "", isActive: true, productCount: 145, sortOrder: 1, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-002", name: "Fruits & Vegetables", slug: "fruits-vegetables", description: "Fresh produce", parentId: null, image: "", isActive: true, productCount: 89, sortOrder: 2, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-003", name: "Dairy", slug: "dairy", description: "Milk, cheese, yogurt & more", parentId: null, image: "", isActive: true, productCount: 67, sortOrder: 3, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-004", name: "Beverages", slug: "beverages", description: "Soft drinks, juices, water", parentId: null, image: "", isActive: true, productCount: 112, sortOrder: 4, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-005", name: "Snacks", slug: "snacks", description: "Chips, cookies, namkeen", parentId: null, image: "", isActive: true, productCount: 203, sortOrder: 5, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-006", name: "Personal Care", slug: "personal-care", description: "Skincare, haircare, hygiene", parentId: null, image: "", isActive: true, productCount: 156, sortOrder: 6, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-007", name: "Home Care", slug: "home-care", description: "Cleaning & household supplies", parentId: null, image: "", isActive: true, productCount: 78, sortOrder: 7, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
  { id: "CAT-008", name: "Baby Care", slug: "baby-care", description: "Baby food, diapers & wipes", parentId: null, image: "", isActive: true, productCount: 43, sortOrder: 8, createdAt: "2024-01-01", updatedAt: "2024-05-01" },
];

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    await delay(300);
    return {
      id: `CAT-${Date.now()}`,
      name: data.name || "",
      slug: data.slug || "",
      description: data.description || "",
      parentId: data.parentId || null,
      image: data.image || "",
      isActive: data.isActive ?? true,
      productCount: 0,
      sortOrder: data.sortOrder || 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
  },

  async updateCategory(id: string, data: Partial<Category>): Promise<Category | undefined> {
    await delay(300);
    const cat = mockCategories.find((c) => c.id === id);
    if (!cat) return undefined;
    return { ...cat, ...data, updatedAt: new Date().toISOString().split("T")[0] };
  },

  async deleteCategory(id: string): Promise<boolean> {
    await delay(200);
    return true;
  },
};
