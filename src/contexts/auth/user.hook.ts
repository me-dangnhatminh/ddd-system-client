import { useMutation, useQuery } from "@tanstack/react-query";
import { IErrorDetail } from "../../api/http-rest/api.dto";
import {
  IUpdateProfileDTO,
  IUserDTO,
  getMe,
  updateProfile,
} from "../../api/http-rest/user";
import { useNavigate } from "react-router-dom";

export enum UserQueryKeys {
  ME = "me",
}

export function useMe() {
  const navigate = useNavigate();

  return useQuery<IUserDTO, IErrorDetail, IUserDTO>({
    queryKey: [UserQueryKeys.ME],
    queryFn: async () => {
      const response = await getMe();
      if (!response.isVerified) navigate("/verify-email");
      return response;
    },
  });
}

export function useUpdateProfile() {
  return useMutation<void, IErrorDetail, IUpdateProfileDTO>({
    mutationFn: updateProfile,
  });
}
