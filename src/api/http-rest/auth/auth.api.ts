import Api from "../api";
import {
  IUserDTO,
  validUserDTO,
  IAuthCredentials,
  ISignUpDTO,
} from "./auth.dtos";

const AT_STORAGE_KEY = "access_token";
// const AT_HEADER_RES_KEY = "x-user-token"; // TODO: Move to env

function saveAccessToken(token: string) {
  localStorage.setItem(AT_STORAGE_KEY, token);
}

function getAccessToken() {
  return localStorage.getItem(AT_STORAGE_KEY);
}
fetch("https://us06web.zoom.us/signin", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "minh", password: "123" }),
});

export function signIn(cres: IAuthCredentials): Promise<void> {
  return Api.post("auth/signin", cres).then((res) => {
    if (res.status !== 200) throw new Error("Login Faild!");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzhhYjMzNS0yOGFkLTQxZjUtYWMzYi0wOGM0ZTE0NjdlOTUiLCJlbWFpbCI6ImRhbmduaGF0bWluaEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTcwOTk1ODI4NSwiZXhwIjoxNzA5OTYxODg1fQ.LHum5scJ-dKXkVCr0wIS1xAwrK3U9cQfDb2du3zcoPs";
    saveAccessToken(token);
  });
}

export function signUp(dto: ISignUpDTO): Promise<void> {
  return Api.post("auth/signup", dto).then();
}

export function getMe(): Promise<IUserDTO> {
  const token = getAccessToken();
  console.log("token", token);
  return Api.get("users/me").then((res) => {
    const result = validUserDTO(res.data);
    if (!result.success) throw result.error;
    return result.data;
  });
}
