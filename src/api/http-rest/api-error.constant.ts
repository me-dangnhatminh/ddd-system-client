import { IValidationError, IValidationErrorParam } from "./api-error.dto";

export enum CommonErrorType {
  Internal = "Internal",
  ValidationError = "ValidationError",
}

export function createValidationError(
  invalidParams: IValidationErrorParam[]
): IValidationError {
  return {
    type: CommonErrorType.ValidationError,
    title: "Validation Error",
    detail: "Request validation failed",
    invalidParams,
  };
}
