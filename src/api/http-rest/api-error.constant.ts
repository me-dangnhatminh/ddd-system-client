import { IApiErrorResponse } from "./api-response.interface";

export const API_RESPONSE_FORMAT_ERROR: IApiErrorResponse = {
  type: "invalid-api-response-format",
  title: "Invalid API Response Format",
  detail: "The response from the API was not in the expected format.",
};
