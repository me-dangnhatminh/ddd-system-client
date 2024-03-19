import { useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";

import {
  signUp,
  signIn,
  signOut,
  emailValidityChecks,
  passwordValidityChecks,
  usernameValidityChecks,
  requestVerifyEmail,
  verifyEmailCode,
} from "../../api/http-rest/auth";
import { useCallback } from "react";
import { UserQueryKeys } from "./user.hook";

const REQUEST_DB = 700;

export function useEmailValidityChecks() {
  const { mutate, ...rest } = useMutation({ mutationFn: emailValidityChecks });
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

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: [UserQueryKeys.ME] });
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [UserQueryKeys.ME] });
    },
    onError() {},
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    throwOnError: true,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [UserQueryKeys.ME] });
    },
  });
}

export function useRequestVerifyEmail() {
  return useMutation({
    mutationFn: requestVerifyEmail,
    throwOnError: true,
  });
}
//
export function useVerifyEmailCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserQueryKeys.ME] });
    },
  });
}
