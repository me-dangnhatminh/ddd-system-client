import { IErrorDetail } from "../../api/http-rest/api-error.dto";
import {
  ISignUpDTO,
  IUserDTO,
  getMe,
  signIn,
  signUp,
} from "../../api/http-rest/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export enum AuthQueryKeys {
  USER = "user",
}

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    throwOnError: true,
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: () => {
      return Promise.resolve();
    },
    throwOnError: true,
  });
}

export function useMe() {
  return useQuery<IUserDTO, IErrorDetail, IUserDTO>({
    queryKey: [AuthQueryKeys.USER],
    queryFn: getMe,
    throwOnError: true,
  });
}

export function useSignUp() {
  return useMutation<void, IErrorDetail, ISignUpDTO>({
    mutationFn: signUp,
  });
}
