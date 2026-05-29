"use client";
import { useState } from "react";
import { 
  Edit2, 
  Trash2, 
  Share2, 
  Loader, 
  CheckCircle, 
  AlertTriangle, 
  List, 
  Folder, 
  Menu 
} from "lucide-react";

// Mock data for categories
const mockCategories = [
  {
    id: 1,
    name: "Groceries",
    parent: null,
    level: 0,
    productCount: 124,
    status: "active",
    gst: "5%",
    icon: "🛒",
    banner: null,
    featuredProducts: 8,
  },
  {
    id: 2,
    name: "Fruits",
    parent: null,
    level: 0,
    productCount: 89,
    status: "active",
    gst: "0%",
    icon: "🍎",
    banner: null,
    featuredProducts: 5,
  },
  {
    id: 3,
    name: "Snacks",
    parent: null,
    level: 0,
    productCount: 156,
    status: "active",
    gst: "12%",
    icon: "🍪",
    banner: null,
    featuredProducts: 12,
  },
  {
    id: 4,
    name: "Dairy",
    parent: null,
    level: 0,
    productCount: 67,
    status: "active",
    gst: "0%",
    icon: "🥛",
    banner: null,
    featuredProducts: 3,
  },
  {
    id: 5,
    name: "Beverages",
    parent: null,
    level: 0,
    productCount: 98,
    status: "active",
    gst: "18%",
    icon: "🥤",
    banner: null,
    featuredProducts: 7,
  },
  {
    id: 6,
    name: "Health",
    parent: null,
    level: 0,
    productCount: 43,
    status: "active",
    gst: "12%",
    icon: "💊",
    banner: null,
    featuredProducts: 4,
  },
  {
    id: 7,
    name: "Fresh Fruits",
    parent: "Fruits",
    level: 1,
    productCount: 45,
    status: "active",
    gst: "0%",
    icon: "🍇",
    banner: null,
    featuredProducts: 3,
  },
  {
    id: 8,
    name: "Dry Fruits",
    parent: "Fruits",
    level: 1,
    productCount: 22,
    status: "active",
    gst: "0%",
    icon: "🥜",
    banner: null,
    featuredProducts: 2,
  },
  {
    id: 9,
    name: "Packed Snacks",
    parent: "Snacks",
    level: 1,
    productCount: 87,
    status: "active",
    gst: "12%",
    icon: "📦",
    banner: null,
    featuredProducts: 6,
  },
  {
    id: 10,
    name: "Cold Beverages",
    parent: "Beverages",
    level: 1,
    productCount: 52,
    status: "active",
    gst: "18%",
    icon: "🧊",
    banner: null,
    featuredProducts: 4,
  },
];

export default function CategoryTable() {
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  const handleDragStart = (categoryId: number) => {
    setDragging(categoryId);
  };

  const handleDragOver = (e: React.DragEvent, categoryId: number) => {
    e.preventDefault();
    setDragOverId(categoryId);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, categoryId: number) => {
    e.preventDefault();
    setDragOverId(null);
    if (!dragging) return;

    // In a real app, we would update the order in the database
    setDragging(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Category Management
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Category List
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              <Share2 className="w-4 h-4" />
              Export
            </button>
            <button
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              <Loader className="w-4 h-4" />
              Import
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
            >
              <Folder className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3 w-8">
                <span className="sr-only">Select all</span>
              </th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">GST</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Banner</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCategories.map((category) => (
              <tr
                key={category.id}
                className={`border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb] cursor-grab ${
                  dragging === category.id ? "opacity-50" : ""
                } ${
                  dragOverId === category.id && dragging !== category.id
                    ? "border-[2px] border-[#0c831f] bg-[#e8f5e9]"
                    : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(category.id)}
                onDragOver={(e) => handleDragOver(e, category.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, category.id)}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    {/* Drag handle */}
                    <div className="w-4 h-4 flex items-center justify-center text-[10px] text-[#666]">
                      ≡
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{category.name}</p>
                    <p className="text-xs text-[#666]">ID: {category.id}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {category.parent ? (
                    <p className="text-sm font-medium text-[#666]">{category.parent}</p>
                  ) : (
                    <p className="text-xs text-[#666]">None</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    Level {category.level}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium">{category.productCount}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f0f9ff] text-blue-600 text-xs">
                    {category.gst}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-2xl">{category.icon}</div>
                </td>
                <td className="px-4 py-4">
                  {category.banner ? (
                    <div className="h-8 w-24 rounded border border-[#e8e8e8]">
                      {/* Banner preview */}
                    </div>
                  ) : (
                    <p className="text-xs text-[#666]">None</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded text-xs font-medium">
                    {category.featuredProducts}+
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    category.status === "active"
                      ? "bg-[#e8f5e9] text-[#0c831f]"
                      : "bg-[#f6f7f6] text-[#666]"
                  }`}>
                    {category.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button className="rounded-lg p-2 hover:bg-[#e8e8e8]">
                      <Menu className="w-4 h-4 text-[#666]" />
                    </button>
                    {/* Dropdown menu for actions */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e8e8e8] rounded-md shadow-lg z-10 hidden">
                      {/* In a real app, this would be toggled */}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
