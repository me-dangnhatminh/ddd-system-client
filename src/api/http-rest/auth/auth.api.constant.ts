export enum AuthErrorType {
  INVALID_CREDENTIALS = "invalid-credentials", // The email or password you entered is incorrect.
  EMAIL_EXISTS = "email-exists", // The email you entered already exists.
  ACCESS_TOKEN_EXPIRED = "access-token-expired", // Your session has expired. Please log in again.
}
