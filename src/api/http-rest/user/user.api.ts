import Api from "../api";
import { IUpdateProfileDTO, IUserDTO, validUserDTO } from "./user.dto";

export const userLocalStorage = Object.freeze({
  save: (user: IUserDTO) => localStorage.setItem("user", JSON.stringify(user)),
  getWithInit: (): IUserDTO => {
    const user = localStorage.getItem("user");
    if (!user)
      return {
        id: "",
        email: "",
        username: "",
        name: "",
        avatarUrl: "",
        isVerified: false,
      };
    const valid = validUserDTO(JSON.parse(user));
    if (!valid.success) throw new Error(valid.error.message);
    return JSON.parse(user);
  },
  remove: () => localStorage.removeItem("user"),
});

export function getMe(): Promise<IUserDTO> {
  return Api.get("users/me").then((res) => {
    const valid = validUserDTO(res.data);
    if (!valid.success) throw new Error(valid.error.message);
    return valid.data;
  });
}

export function updateProfile(dto: IUpdateProfileDTO): Promise<void> {
  dto;
  throw new Error("Not implemented yet");
}
