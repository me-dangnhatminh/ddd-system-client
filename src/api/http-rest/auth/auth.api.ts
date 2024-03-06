import Api from "../api";
import { IUserDTO, validUserDTO, validArrUserDTO } from "./auth.dtos";

export async function login(credentials: { email: string; password: string }) {
  return Api.post(
    "https://jsonplaceholder.typicode.com/users",
    credentials
  ).then((res) => {
    const token: string = res.headers["x-auth-token"];
    if (!token && typeof token !== "string")
      throw Error("InvalidAPI response format, token must be a string");
    else return { accessToken: token };
  });
}

export async function getMe(): Promise<IUserDTO> {
  const data = {
    id: 1,
    name: "fake-user",
    email: "fake@gmail.com",
    phone: "123-456-7890",
  };

  const result = validUserDTO(data);
  if (!result.success) throw result.error;
  return result.data;
}

export async function getUsers() {
  return Api.get("https://jsonplaceholder.typicode.com/users").then((res) => {
    const result = validArrUserDTO(res.data);
    if (!result.success) throw result.error;
    return result.data;
  });
}
