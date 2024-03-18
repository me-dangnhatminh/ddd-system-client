import { useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";

import {
  emailValidityChecks,
  passwordValidityChecks,
  signUp,
  signIn,
  usernameValidityChecks,
  requestVerifyEmail,
  verifyEmailCode,
  signOut,
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
  return useMutation({ mutationFn: signUp });
}

export function useSignIn() {
  return useMutation({ mutationFn: signIn });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    throwOnError: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UserQueryKeys.ME] });
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
