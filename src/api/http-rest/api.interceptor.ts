import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiError, isErrorDetail } from "./api.dto";

const PROBLEM_DETAILS_CONTENT_TYPE = "application/problem+json";

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem("access_token");
  if (token) config.headers["x-access-token"] = `${token}`;
  return config;
};

export const apiResponseInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  const contentType = response.headers["content-type"];
  if (contentType?.includes(PROBLEM_DETAILS_CONTENT_TYPE)) {
    const error = response.data;
    if (!isErrorDetail(error)) throw new Error("Invalid error response format");
    console.error("API Error", error);
    throw ApiError.fromError(error);
  }

  return response;
};
