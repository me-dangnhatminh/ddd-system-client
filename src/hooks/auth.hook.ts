import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback } from "react";
import {
  emailValidityChecks,
  passwordValidityChecks,
  requestVerifyEmail,
  signIn,
  signOut,
  signUp,
  usernameValidityChecks,
  verifyEmailCode,
} from "../api/http-rest/auth";
import { getMe } from "../api/http-rest/user";

const REQUEST_DB = 700;

export function useEmailValidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: emailValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

export function usePassvalidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: passwordValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

export function useUsernameValidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: usernameValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

export function useUser(isSignedIn: boolean = false) {
  return useQuery({
    queryKey: ["user", isSignedIn],
    queryFn: getMe,
    enabled: isSignedIn,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
}

export function useRequestVerifyEmail() {
  return useMutation({ mutationFn: requestVerifyEmail });
}

export function useVerifyEmailCode() {
  return useMutation({ mutationFn: verifyEmailCode });
}
