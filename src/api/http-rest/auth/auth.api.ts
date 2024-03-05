import Api from "../api";
import { isUsersDTO } from "./auth.dtos";

import { API_RESPONSE_FORMAT_ERROR } from "../api-error.constant";

export async function getUsers() {
  const res = await Api.get("https://jsonplaceholder.typicode.com/users");
  if (!isUsersDTO(res.data)) throw API_RESPONSE_FORMAT_ERROR;
  return res.data;
}
