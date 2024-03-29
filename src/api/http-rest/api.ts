import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from "axios";
import {
  apiRequestInterceptor,
  apiResponseErrorInterceptor,
  apiResponseSuccessInterceptor,
} from "./api.interceptor";

const REQUEST_TIMEOUT_MS = 30000;
const API_BASE_URL = "http://localhost:3000"; //TODO: Move to env

const apiRequestConfig: CreateAxiosDefaults<unknown> = {
  baseURL: `${API_BASE_URL}`,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const axiosInstance: AxiosInstance = axios.create(apiRequestConfig);

axiosInstance.interceptors.request.use(apiRequestInterceptor);
axiosInstance.interceptors.response.use(
  apiResponseSuccessInterceptor,
  apiResponseErrorInterceptor
);

class Api {
  static get<T>(
    url: string,
    queryParams?: unknown,
    config: AxiosRequestConfig = {}
  ) {
    return axiosInstance.get<T>(url, { ...config, params: queryParams });
  }

  static post<T>(
    url: string,
    body?: unknown,
    queryParams?: unknown,
    config: AxiosRequestConfig = {}
  ) {
    return axiosInstance.post<T>(url, body, { ...config, params: queryParams });
  }

  static async put<T>(
    url: string,
    body?: unknown,
    queryParams?: unknown,
    config: AxiosRequestConfig = {}
  ) {
    return axiosInstance.put<T>(url, body, { ...config, params: queryParams });
  }

  static async patch<T>(
    url: string,
    body?: unknown,
    queryParams?: unknown,
    config: AxiosRequestConfig = {}
  ) {
    return axiosInstance.patch<T>(url, body, {
      ...config,
      params: queryParams,
    });
  }

  static async delete<T>(
    url: string,
    queryParams?: unknown,
    config: AxiosRequestConfig = {}
  ) {
    return axiosInstance.delete<T>(url, { ...config, params: queryParams });
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export default Api;
