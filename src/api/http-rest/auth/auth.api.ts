import Api from "../api";
import { IAuthCredentials, ISignUpDTO } from "./auth.dto";

export function emailValidityChecks(email: string) {
  return Api.post("auth/email-validity-checks", { value: email });
}

export function passwordValidityChecks(password: string) {
  return Api.post("auth/password-validity-checks", { value: password });
}

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then();
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}
