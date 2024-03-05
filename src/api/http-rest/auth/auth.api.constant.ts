export enum AuthErrorType {
  InvalidCredentials = "invalid-credentials", // The email or password you entered is incorrect.
  EmailExists = "email-exists", // The email you entered already exists.
  EmailNotFound = "email-not-found", // The email you entered does not exist.
  AccessTokenExpired = "access-token-expired",
}
