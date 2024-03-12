import Api from "../api";
import {
  IUserDTO,
  validUserDTO,
  IAuthCredentials,
  ISignUpDTO,
  IUpdateProfileDTO,
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
      avatarUrl:
        "https://media.istockphoto.com/id/1954365819/vi/vec-to/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BA%BB-thi%E1%BB%81n-%C4%91%E1%BB%8Bnh.jpg?s=612x612&w=0&k=20&c=SA3T36N6JvV34Kwm_9NAKED6PN7nyUQQVaYnkBB5JuE=",
    });
    if (!result.success) throw result.error;
    return result.data;
  });
}

export function updateProfile(dto: IUpdateProfileDTO): Promise<void> {
  const formData = new FormData();
  if (dto.firstName) formData.append("firstName", dto.firstName);
  if (dto.lastName) formData.append("lastName", dto.lastName);
  if (dto.rawAvatar) formData.append("avatar", dto.rawAvatar);

  throw new Error("Not implemented yet");
}
