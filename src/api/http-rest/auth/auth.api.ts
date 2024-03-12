import Api from "../api";
import {
  IUserDTO,
  validUserDTO,
  IAuthCredentials,
  ISignUpDTO,
} from "./auth.dto";

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then((res) => {
    const token = res.headers["x-access-token"];
    if (!token || typeof token !== "string")
      throw Error("No access token received from server");
    localStorage.setItem("access_token", token);
  });
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}

export function getMe(): Promise<IUserDTO> {
  return Api.get("users/me").then((res) => {
    // TODO: fix
    const result = validUserDTO({
      ...(res.data as IUserDTO),
      avatarUrl: "hello",
    });
    if (!result.success) throw result.error;
    return result.data;
  });
}
