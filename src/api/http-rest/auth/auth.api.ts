import Api from "../api";
import { isUsersDTO } from "./auth.dtos";

import { API_RESPONSE_FORMAT_ERROR } from "../api-error.constant";
import { ApiResponseError } from "../api-response.interface";

export async function getUsers() {
  const res = await Api.get("https://jsonplaceholder.typicode.com/users");
  if (!isUsersDTO(res.data))
    throw new ApiResponseError(API_RESPONSE_FORMAT_ERROR);
  return res.data;
}

const fakeUser = {
  email: "fake-user@gmail.com",
  password: "fake-password",
};

export async function login(credentials: { email: string; password: string }) {
  const { email, password } = credentials;
  if (email === fakeUser.email && password === fakeUser.password) {
    return;
  } else throw new Error("Invalid credentials");
}
