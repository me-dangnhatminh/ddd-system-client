import { useMutation, useQuery } from "@tanstack/react-query";
import { IErrorDetail } from "../../api/http-rest/api.dto";
import { IUserDTO, getMe, updateProfile } from "../../api/http-rest/user";

export enum UserQueryKeys {
  ME = "me",
}

export function useMe() {
  return useQuery<IUserDTO, IErrorDetail, IUserDTO>({
    queryKey: [UserQueryKeys.ME],
    queryFn: getMe,
  });
}

export function useUpdateProfile() {
  return useMutation({ mutationFn: updateProfile });
}
