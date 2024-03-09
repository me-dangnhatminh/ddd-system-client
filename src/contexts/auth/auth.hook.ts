import { getMe, signIn, signUp } from "../../api/http-rest/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export enum AuthQueryKeys {
  USER = "user",
}

export function useSignIn() {
  return useMutation({ mutationFn: signIn });
}

export function useMe() {
  return useQuery({
    queryKey: [AuthQueryKeys.USER],
    queryFn: getMe,
    throwOnError: true,
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    throwOnError: true,
  });
}
