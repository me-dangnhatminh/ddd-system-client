import Api from "../api";
import {
  IUserDTO,
  validUserDTO,
  IAuthCredentials,
  ISignUpDTO,
} from "./auth.dto";

const AT_HEADER_RES_KEY = "x-access-token";
const AT_TOKEN_STORAGE_KEY = "access_token";

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then((res) => {
    const token = res.headers[AT_HEADER_RES_KEY];
    if (!token || typeof token !== "string")
      throw Error("No access token received from server");
    localStorage.setItem(AT_TOKEN_STORAGE_KEY, token);
  });
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}

export function getMe(): Promise<IUserDTO> {
  return Api.get("users/me").then((res) => {
    const result = validUserDTO(res.data);
    if (!result.success) throw Error("Invalid user data received from server");
    return result.data;
  });
}
