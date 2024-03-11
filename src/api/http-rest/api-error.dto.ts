import { z } from "zod";
import { CommonErrorType } from "./api-error.constant";

export const ErrorDetailSchema = z.object({
  type: z.string(),
  title: z.string(),
  detail: z.string(),
});

export const ValidationErrorParamSchema = z.object({
  name: z.string(),
  reason: z.string(),
});
// type must be "validation"
export const ValidationErrorSchema = z.object({
  type: z.literal(CommonErrorType.ValidationError),
  title: z.string(),
  detail: z.string(),
  invalidParams: z.array(ValidationErrorParamSchema),
});

export type IErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type IValidationErrorParam = z.infer<typeof ValidationErrorParamSchema>;
export type IValidationError = z.infer<typeof ValidationErrorSchema>;

export class ApiError extends Error implements IErrorDetail {
  constructor(
    public readonly type: string,
    public readonly title: string,
    public readonly detail: string
  ) {
    super(detail);
  }

  static fromError(detail: IErrorDetail) {
    return new ApiError(detail.type, detail.title, detail.detail);
  }
}

export const isErrorDetail = (error: unknown): error is IErrorDetail => {
  return ErrorDetailSchema.safeParse(error).success;
};
export const isValidationError = (
  error: unknown
): error is IValidationError => {
  return ValidationErrorSchema.safeParse(error).success;
};
export const validErrorDetail = ErrorDetailSchema.safeParse;
export const validValidationError = ValidationErrorSchema.safeParse;
export const validValidationErrorParam = ValidationErrorParamSchema.safeParse;
