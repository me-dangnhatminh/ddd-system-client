import Api from "../api";
import { IUserDTO, validUserDTO, validArrUserDTO } from "./auth.dtos";

export async function login(credentials: { email: string; password: string }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      credentials;
      resolve(Math.random() >= 0.5);
    }, 2000);
  }).then((res) => {
    if (!res)
      throw {
        type: "invalid-credentials",
        title: "Invalid Credentials",
        detail: "The email or password you entered is incorrect.",
      };
  });
}

export async function getMe(): Promise<IUserDTO> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    id: 1,
    name: "fake-user",
    email: "fake@gmail.com",
    phone: "123-456-7890",
  };

  const result = validUserDTO(data);
  if (!result.success) throw Error("Invalid API response format");
  return result.data;
}

export async function getUsers() {
  return Api.get("https://jsonplaceholder.typicode.com/users").then((res) => {
    const result = validArrUserDTO(res.data);
    if (!result.success) throw Error("Invalid API response format");
    return result.data;
  });
}
