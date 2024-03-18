import axios, {
  type AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { ApiError } from "./api.dto";

const PROBLEM_DETAILS_CONTENT_TYPE = "application/problem+json";

export const apiRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
};

// in axios, status code 2xx is considered as success
export const apiResponseSuccessInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  return response;
};

// in axios, status code 4xx and 5xx is considered as error
export const apiResponseErrorInterceptor = (error: AxiosError) => {
  if (!axios.isAxiosError(error)) throw ApiError.unknown();

  const response = error.response;
  if (!response) throw ApiError.networkError(); // TODO: fix

  const contentType = response.headers["content-type"] ?? "";
  if (contentType.includes(PROBLEM_DETAILS_CONTENT_TYPE)) {
    const problemDetails = response.data;
    if (!ApiError.isApiError(problemDetails)) throw ApiError.formatError();
    throw ApiError.fromError(problemDetails);
  }

  throw ApiError.unknown();
};
