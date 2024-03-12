import { IValidationError } from "../api.dto";

export const invalidParamsToCredentials = (
  error: IValidationError
): { email?: string; password?: string } => {
  const invalidParams = error.errors;
  const result: ReturnType<typeof invalidParamsToCredentials> = {};
  for (const param of invalidParams) {
    if (param.name === "email") result.email = param.reason;
    if (param.name === "password") result.password = param.reason;
  }
  return result;
};
