export enum AuthErrorType {
  Auth_UserNotExists = "Auth_UserNotExists",
  Auth_InvalidCredentials = "Auth_InvalidCredentials",
  Auth_EmailExists = "Auth_EmailExists",
  Auth_EmailConflict = "Auth_EmailConflict",
  Auth_EmailCodeInvalid = "Auth_EmailCodeInvalid",
  Auth_SignInTokenInvalid = "Auth_SignInTokenInvalid",
  Auth_NotSignedIn = "Auth_NotSignedIn",
  Auth_NotConfirmed = "Auth_NotConfirmed",
  Auth_VerifiedEmail = "Auth_VerifiedEmail",
}
