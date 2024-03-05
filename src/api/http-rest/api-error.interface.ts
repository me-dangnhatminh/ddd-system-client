import { z } from "zod";

const ErrorDetailSchema = z.object({
  type: z.string(),
  title: z.string(),
  detail: z.string(),
});

const ValidationErrorParamSchema = z.object({
  name: z.string(),
  reason: z.string(),
});

const ValidationErrorSchema = z.object({
  type: z.string(),
  title: z.string(),
  detail: z.string(),
  invalidParams: z.array(ValidationErrorParamSchema),
});

export type IErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type IValidationErrorParam = z.infer<typeof ValidationErrorParamSchema>;
export type IValidationError = z.infer<typeof ValidationErrorSchema>;

export const validErrorDetail = ErrorDetailSchema.safeParse;
export const validValidationError = ValidationErrorSchema.safeParse;
export const validValidationErrorParam = ValidationErrorParamSchema.safeParse;
