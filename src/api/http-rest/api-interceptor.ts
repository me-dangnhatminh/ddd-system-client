import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { isErrorDetail } from "./api-error.dto";

const API_KEY_STORE_ACCESS_TOKEN = "access_token";
const API_ACCESS_TOKEN_HEADER = "x-access-token";
const PROBLEM_DETAILS_CONTENT_TYPE = "application/problem+json";

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem(API_KEY_STORE_ACCESS_TOKEN);
  if (token) config.headers[API_ACCESS_TOKEN_HEADER] = `${token}`;
  return config;
};

export const apiResponseInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  const contentType = response.headers["content-type"];
  if (contentType?.includes(PROBLEM_DETAILS_CONTENT_TYPE)) {
    const error = response.data;
    if (!isErrorDetail(error)) throw new Error("Invalid error response format");
    throw error;
  }

  return response;
};
