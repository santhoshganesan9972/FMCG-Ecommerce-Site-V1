<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6add8aa3ad16dc0ccdd21331266d398ef045c42e
"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import MediaUploader from "@/components/ui/products/admin/media-uploader";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import { useProductMedia } from "@/hooks/use-products";
import { Image, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function MediaPage() {
  const { mediaItems, loading, error, fetchMedia, deleteMedia, setPrimaryMedia } = useProductMedia();
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchMedia(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Product Media</h1>
              <p className="mt-1.5 max-w-2xl text-xs text-[#666]">
                Upload and manage product images, videos, and documents. {mediaItems.length} media files across all products.
              </p>
            </div>
            <button
              onClick={() => fetchMedia()}
              className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={handleSearch} placeholder="Search by product name..." />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <MediaUploader
          items={mediaItems}
          onDelete={async (id) => {
            const success = await deleteMedia(id);
            if (success) toast.success("Media deleted");
          }}
          onSetPrimary={async (id) => {
            const success = await setPrimaryMedia(id);
            if (success) toast.success("Primary image updated");
          }}
          onUpload={(files) => toast.success(`${files.length} file(s) queued for upload`)}
          isLoading={loading}
        />
      </div>
    </DashboardLayout>
  );
}
=======
"use client";

import { useState } from "react";

import MediaUploader from "@/components/ui/products/admin/media-uploader";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import { useProductMedia } from "@/hooks/use-products";
import { Image, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function MediaPage() {
  const { mediaItems, loading, error, fetchMedia, deleteMedia, setPrimaryMedia } = useProductMedia();
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchMedia(value);
  };

  return (      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Product Media</h1>
              <p className="mt-1.5 max-w-2xl text-xs text-[#666]">
                Upload and manage product images, videos, and documents. {mediaItems.length} media files across all products.
              </p>
            </div>
            <button
              onClick={() => fetchMedia()}
              className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={handleSearch} placeholder="Search by product name..." />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <MediaUploader
          items={mediaItems}
          onDelete={async (id) => {
            const success = await deleteMedia(id);
            if (success) toast.success("Media deleted");
          }}
          onSetPrimary={async (id) => {
            const success = await setPrimaryMedia(id);
            if (success) toast.success("Primary image updated");
          }}
          onUpload={(files) => toast.success(`${files.length} file(s) queued for upload`)}
          isLoading={loading}
        />
      </div>  );
}
>>>>>>> 2ac58d4c4af2a3758793e33358d3e0b04f36e85b
