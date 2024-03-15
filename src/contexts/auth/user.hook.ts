import { useMutation, useQuery } from "@tanstack/react-query";
import { IErrorDetail } from "../../api/http-rest/api.dto";
import {
  IUpdateProfileDTO,
  IUserDTO,
  getMe,
  updateProfile,
} from "../../api/http-rest/user";

export function useMe() {
  return useQuery<IUserDTO, IErrorDetail, IUserDTO>({
    queryKey: ["user"],
    queryFn: getMe,
  });
}

export function useUpdateProfile() {
  return useMutation<void, IErrorDetail, IUpdateProfileDTO>({
    mutationFn: updateProfile,
  });
}
