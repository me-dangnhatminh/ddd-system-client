import Api from "../api";
import { IAuthCredentials, ISignUpDTO } from "./auth.dto";

export function emailValidityChecks(email: string) {
  return Api.post("auth/email-validity-checks", { email });
}

export function passwordValidityChecks(password: string) {
  return Api.post("auth/password-validity-checks", { password });
}

export function usernameValidityChecks(username: string) {
  return Api.post("auth/username-validity-checks", { username });
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then();
}

export function signOut(): Promise<void> {
  return Api.post("auth/signout").then();
}

export function requestVerifyEmail(dto: { email: string }): Promise<void> {
  return Api.post("auth/email/confirmation/request", dto).then();
}

export function verifyEmailCode(dto: {
  email: string;
  code: string;
}): Promise<void> {
  return Api.post("auth/email/confirmation/verify", dto).then();
}
