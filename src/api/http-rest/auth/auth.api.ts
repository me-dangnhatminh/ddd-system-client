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

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then();
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}
