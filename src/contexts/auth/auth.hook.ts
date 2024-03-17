import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";

import { IErrorDetail } from "../../api/http-rest/api.dto";
import {
  ISignUpDTO,
  emailValidityChecks,
  passwordValidityChecks,
  signUp,
  signIn,
  usernameValidityChecks,
} from "../../api/http-rest/auth";
import { useCallback } from "react";

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

export function useSignIn() {
  return useMutation({ mutationFn: signIn, throwOnError: true });
}

export function useSignOut() {
  return useMutation({
    mutationFn: () => Promise.resolve(),
    throwOnError: true,
  });
}

export function useSignUp() {
  return useMutation<void, IErrorDetail, ISignUpDTO>({
    mutationFn: signUp,
  });
}
