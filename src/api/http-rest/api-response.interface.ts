export interface IApiErrorResponse {
  type: string;
  title: string;
  detail: string;
}

export class ApiResponseError extends Error implements IApiErrorResponse {
  type: string;
  title: string;
  detail: string;

  constructor(error: IApiErrorResponse) {
    super(error.detail);
    this.type = error.type;
    this.title = error.title;
    this.detail = error.detail;
  }
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
