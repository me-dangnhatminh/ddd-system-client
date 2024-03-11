import { createValidationError } from "../api-error.constant";
import { IValidationError } from "../api-error.dto";
import { IAuthCredentials, validAuthCredentials } from "./auth.dtos";

// export function validSignInDTO(dto: IAuthCredentials) {
//   const valid = validAuthCredentials(dto);
//   if (valid.success) return;
//   const invalidParams: IValidationError["invalidParams"] =
//     valid.error.errors.map((err) => ({
//       name: err.path[0] + "",
//       reason: err.message,
//     }));
//   const error = createValidationError(invalidParams);
//   throw ApiResponseError.fromError(error);
// }
