import { z } from "zod";

const ErrorDetailSchema = z.object({
  type: z.string(),
  title: z.string(),
  detail: z.string(),
});

const InvalidParamSchema = z.object({
  name: z.string(),
  reason: z.string(),
});

const ValidationErrorSchema = z.object({
  type: z.string(),
  title: z.string(),
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

export class ApiError extends Error implements IErrorDetail {
  constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly detail: string
  ) {
    super(detail);
  }

  static unknown(
    type = "about:blank",
    title = "An unknown error occurred.",
    detail = "An unknown error occurred."
  ): ApiError {
    return new ApiError(type, title, detail);
  }

  static fromError(detail: IErrorDetail) {
    return new ApiError(detail.type, detail.title, detail.detail);
  }
}

export class ApiValidationError extends ApiError {
  constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly detail: string,
    public readonly errors: Array<{ name: string; reason: string }>
  ) {
    super(type, title, detail);
  }
}
