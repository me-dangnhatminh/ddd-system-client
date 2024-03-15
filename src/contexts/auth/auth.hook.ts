import { IErrorDetail } from "../../api/http-rest/api.dto";
import {
  IAuthCredentials,
  ISignUpDTO,
  emailValidityChecks,
  signIn,
  signUp,
} from "../../api/http-rest/auth";
import { useMutation } from "@tanstack/react-query";

export function useEmailValidityChecks() {
  return useMutation({ mutationFn: emailValidityChecks });
}

export function useSignIn() {
  return useMutation<void, IErrorDetail, IAuthCredentials>({
    mutationFn: signIn,
  });
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
