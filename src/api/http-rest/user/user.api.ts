import Api from "../api";
import { IUpdateProfileDTO, IUserDTO, validUserDTO } from "./user.dto";

export function getMe(): Promise<IUserDTO> {
  return Api.get("users/me").then((res) => {
    const valid = validUserDTO(res.data);
    if (!valid.success) throw new Error(valid.error.message);
    return valid.data;
  });
}

export function updateProfile(dto: IUpdateProfileDTO): Promise<void> {
  const formData = new FormData();
  if (dto.firstName) formData.append("firstName", dto.firstName);
  if (dto.lastName) formData.append("lastName", dto.lastName);
  if (dto.rawAvatar) formData.append("avatar", dto.rawAvatar);

  throw new Error("Not implemented yet");
}
