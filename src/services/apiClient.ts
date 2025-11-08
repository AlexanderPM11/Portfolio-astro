// src/services/apiClient.ts
import axios, { type AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.PUBLIC_WORDPRESS_API_URL
    ? import.meta.env.PUBLIC_WORDPRESS_API_URL.replace("?rest_route=/wp/v2/posts", "")
    : "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor opcional (puedes agregar logs, tokens, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Error en API:", error.message);
    throw error;
  }
);

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function post<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function put<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}

export default apiClient;
