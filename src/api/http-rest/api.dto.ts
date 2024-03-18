import { z } from "zod";

const ErrorDetailSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
});

const InvalidParamSchema = z.object({
  name: z.string(),
  reason: z.string(),
});

const ValidationErrorSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  errors: z.array(InvalidParamSchema),
});

export type IErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type IInvalidParam = z.infer<typeof InvalidParamSchema>;
export type IValidationError = z.infer<typeof ValidationErrorSchema>;

export const isErrorDetail = (error: unknown): error is IErrorDetail => {
  return ErrorDetailSchema.safeParse(error).success;
};

export const isValidationError = (
  error: unknown
): error is IValidationError => {
  return ValidationErrorSchema.safeParse(error).success;
};

export class ApiError<T extends IErrorDetail = IErrorDetail> extends Error {
  constructor(public readonly error: T) {
    super(error.detail);
  }

  static isApiError(error: unknown): error is IErrorDetail {
    return isErrorDetail(error);
  }

  static new<T extends IErrorDetail = IErrorDetail>(error: T): ApiError<T> {
    return new ApiError(error);
  }

  static fromError(error: IErrorDetail): ApiError {
    return new ApiError(error);
  }

  static networkError(
    type = "about:blank",
    title = "Network error occurred.",
    status = 0,
    detail = "A network error occurred."
  ): ApiError {
    return new ApiError({ type, title, status, detail });
  }

  static unknown(
    type = "about:blank",
    title = "An unknown error occurred.",
    status = 500,
    detail = "An unknown error occurred."
  ): ApiError {
    return new ApiError({ type, title, status, detail });
  }

  static formatError(
    error: IErrorDetail = {
      type: "about:blank",
      title: "An unknown error occurred.",
      status: 500,
      detail: "An unknown error occurred.",
    }
  ): ApiError {
    return new ApiError(error);
  }
}
