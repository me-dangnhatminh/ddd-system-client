import Api from "../api";
import {
  IUserDTO,
  validUserDTO,
  IAuthCredentials,
  ISignUpDTO,
} from "./auth.dtos";

const AT_STORAGE_KEY = "access_token";
const AT_HEADER_RES_KEY = "x-access-token"; // TODO: Move to env

function saveAccessToken(token: string) {
  localStorage.setItem(AT_STORAGE_KEY, token);
}

function getAccessToken() {
  return localStorage.getItem(AT_STORAGE_KEY);
}

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then((res) => {
    const token: string = res.headers[AT_HEADER_RES_KEY];
    if (!token && typeof token !== "string")
      throw Error("InvalidAPI response format, token must be a string");
    saveAccessToken(token);
  });
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}

export function getMe(): Promise<IUserDTO> {
  const token = getAccessToken();
  if (!token) throw Error("Unauthorized, token not found in storage");
  return Api.get("users/me").then((res) => {
    const result = validUserDTO(res.data);
    if (!result.success) throw result.error;
    return result.data;
  });
}
