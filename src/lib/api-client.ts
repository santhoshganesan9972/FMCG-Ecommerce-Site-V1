// ── Axios API Client ─────────────────────────────────────
// Single Axios instance for all admin API calls.
// Swap baseURL via env var — defaults to mock/data layer when not set.

import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { env } from "@/lib/env";

const API_BASE_URL = env.apiBaseUrl;

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15_000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true, // for HTTP-only cookies
    });

    // ── Request interceptor: attach auth token ──
    this.client.interceptors.request.use(
      (config) => {
        // When using HTTP-only cookies, the cookie is sent automatically.
        // For bearer-token auth (fallback):
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("admin_token")
            : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // ── Response interceptor: normalize errors ──
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response;
          // Normalize structured error responses
          const message =
            (data as { message?: string })?.message ||
            (data as { error?: string })?.error ||
            `Request failed with status ${status}`;
          return Promise.reject(new ApiError(message, status, data));
        }
        if (error.request) {
          return Promise.reject(new ApiError("No response from server — check your connection", 0));
        }
        return Promise.reject(new ApiError(error.message, 0));
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Singleton export
export const apiClient = new ApiClient(API_BASE_URL);

// For testing / custom instances
export function createApiClient(baseURL: string): ApiClient {
  return new ApiClient(baseURL);
}
