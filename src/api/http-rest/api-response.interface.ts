export interface IApiErrorResponse {
  type: string;
  title: string;
  detail: string;
}

export function isApiError(obj: unknown): obj is IApiErrorResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "type" in obj &&
    "title" in obj &&
    "detail" in obj
  );
}
