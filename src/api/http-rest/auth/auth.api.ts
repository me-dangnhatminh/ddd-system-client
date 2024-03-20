import Api from "../api";
import { IAuthCredentials, ISignUpDTO } from "./auth.dto";

export const AuthToken = Object.freeze({
  isSignedIn: () => {
    return !!localStorage.getItem("token");
  },
  get: () => {
    const token = localStorage.getItem("token");
    if (token) return token;
    return null;
  },
  save: (token: string) => {
    localStorage.setItem("token", token);
  },
  remove: () => {
    localStorage.removeItem("token");
  },
});

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

export function requestResetPassword(dto: { email: string }): Promise<void> {
  return Api.post("auth/password/reset/request", dto).then();
}

export function resetPassword(dto: {
  token: string;
  email: string;
  newPassword: string;
}): Promise<void> {
  return Api.post("auth/password/reset/verify", dto).then();
}
