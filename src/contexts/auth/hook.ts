import { getMe, getUsers, login } from "../../api/http-rest/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export enum AuthQueryKeys {
  USER = "user",
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => localStorage.setItem("access_token", data.accessToken),
    throwOnError: true,
  });
}

export function useMe() {
  return useQuery({
    queryKey: [AuthQueryKeys.USER],
    queryFn: getMe,
    throwOnError: true,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: () => Promise.resolve(),
    throwOnError: true,
  });
}

export function useListUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    throwOnError: true,
  });
}
