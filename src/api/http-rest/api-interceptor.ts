import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_KEY_STORE_ACCESS_TOKEN = "access_token";
const API_ACCESS_TOKEN_HEADER = "x-access-token";
const PROBLEM_DETAILS_CONTENT_TYPE = "application/problem+json";

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem(API_KEY_STORE_ACCESS_TOKEN);
  if (token) config.headers[API_ACCESS_TOKEN_HEADER] = `${token}`;
  return config;
};

export const apiResponseInterceptor = (response: AxiosResponse) => {
  const mediaType = response.headers["Content-Type"];
  if (mediaType === undefined) return response;
  if (mediaType === PROBLEM_DETAILS_CONTENT_TYPE) {
    //
  }
};
