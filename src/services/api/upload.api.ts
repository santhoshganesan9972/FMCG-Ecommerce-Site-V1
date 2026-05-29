// ── Upload API Adapter ────────────────────────────────────
// Layer: Services → API Adapter → apiClient → Backend
// Handles file uploads with progress tracking support.

import { apiClient, createCancellableSignal } from "@/lib/api/api-client";
import { UPLOAD } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";

// ── Types ─────────────────────────────────────────────────

export interface UploadResult {
  url: string;
  key: string;
  originalName: string;
  size: number;
  mimeType: string;
}

export type UploadType = "product-image" | "avatar" | "banner" | "bulk";

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// ── Helpers ───────────────────────────────────────────────

/**
 * Get the upload endpoint for a given upload type.
 */
function getUploadEndpoint(type: UploadType): string {
  switch (type) {
    case "product-image":
      return UPLOAD.PRODUCT_IMAGE;
    case "avatar":
      return UPLOAD.AVATAR;
    case "banner":
      return UPLOAD.BANNER;
    case "bulk":
      return UPLOAD.BULK;
    default:
      return UPLOAD.PRODUCT_IMAGE;
  }
}

// ── Upload API Adapter ────────────────────────────────────

export const uploadApi = {
  /**
   * Upload a single file.
   * Supports progress tracking via the onProgress callback.
   */
  uploadFile: async (
    file: File,
    type: UploadType = "product-image",
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<ApiResponse<UploadResult>> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data: response } = await apiClient.post<ApiResponse<UploadResult>>(
      getUploadEndpoint(type),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        signal: createCancellableSignal(),
        onUploadProgress: onProgress
          ? (progressEvent) => {
              const loaded = progressEvent.loaded;
              const total = progressEvent.total ?? file.size;
              onProgress({
                loaded,
                total,
                percentage: Math.round((loaded * 100) / total),
              });
            }
          : undefined,
      },
    );
    return response;
  },

  /**
   * Upload multiple files at once.
   */
  uploadMultiple: async (
    files: File[],
    type: UploadType = "product-image",
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<ApiResponse<UploadResult[]>> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const { data: response } = await apiClient.post<ApiResponse<UploadResult[]>>(
      getUploadEndpoint(type),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        signal: createCancellableSignal(),
        onUploadProgress: onProgress
          ? (progressEvent) => {
              const loaded = progressEvent.loaded;
              const totalSize = files.reduce((s, f) => s + f.size, 0);
              const total = progressEvent.total ?? totalSize;
              onProgress({
                loaded,
                total,
                percentage: Math.round((loaded * 100) / total),
              });
            }
          : undefined,
      },
    );
    return response;
  },

  /**
   * Delete an uploaded file by its key.
   */
  deleteFile: async (key: string): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.delete<ApiResponse<null>>(
      `${UPLOAD.PRODUCT_IMAGE}/${encodeURIComponent(key)}`,
      { signal: createCancellableSignal() },
    );
    return response;
  },
};
