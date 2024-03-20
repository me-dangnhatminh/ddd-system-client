import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import * as AuthApi from "../api/http-rest/auth";

const REQUEST_DB = 700;

// Validity checks hooks
export function useEmailValidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: AuthApi.emailValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

export function usePassvalidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: AuthApi.passwordValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

export function useUsernameValidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: AuthApi.usernameValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

// Auth hook
type SignInType = UseMutationResult<void, Error, AuthApi.IAuthCredentials>;
type SignUpType = UseMutationResult<void, Error, AuthApi.ISignUpDTO>;
type SignOutType = UseMutationResult<void, Error, void>;
type EmailValidityChecksType = ReturnType<typeof useEmailValidityChecks>;
type PasswordValidityChecksType = ReturnType<typeof usePassvalidityChecks>;
type UsernameValidityChecksType = ReturnType<typeof useUsernameValidityChecks>;
type RequestVerifyEmailType = UseMutationResult<void, Error, { email: string }>;
type VerifyEmailCodeType = UseMutationResult<
  void,
  Error,
  { email: string; code: string }
>;

type ISignedState = {
  isSignedIn: true;
  emailChecks?: never;
  passwordChecks?: never;
  usernameChecks?: never;
  signOut: SignOutType;
  signIn?: never;
  signUp?: never;
  requestVerifyEmail: RequestVerifyEmailType;
  verifyEmailCode: VerifyEmailCodeType;
};

interface IUnsignedState {
  isSignedIn: false;
  emailCheck: EmailValidityChecksType;
  passwordCheck: PasswordValidityChecksType;
  usernameCheck: UsernameValidityChecksType;
  signOut?: never;
  signIn: SignInType;
  signUp: SignUpType;
}
export type AuthState = ISignedState | IUnsignedState;

export function useAuth(): AuthState {
  const queryClient = useQueryClient();
  const [isSignedIn, setIsSignedIn] = useState(AuthApi.AuthToken.isSignedIn());

  const emailCheck = useEmailValidityChecks();
  const passwordCheck = usePassvalidityChecks();
  const usernameCheck = useUsernameValidityChecks() ;

  const signIn = useMutation({
    mutationFn: async (cres: AuthApi.IAuthCredentials) => {
      await AuthApi.signIn(cres);
      await AuthApi.AuthToken.save("token");
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await setIsSignedIn(true);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const signUp = useMutation({
    mutationFn: async (dto: AuthApi.ISignUpDTO) => {
      await AuthApi.signUp(dto);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await AuthApi.AuthToken.save("token");
      await setIsSignedIn(true);
    },
  });

  const signOut = useMutation({
    mutationKey: ["signOut"],
    mutationFn: async () => {
      await AuthApi.signOut();
      await queryClient.setQueryData(["me"], undefined);
      AuthApi.AuthToken.remove();
      await setIsSignedIn(false);
    },
  });
  const requestVerifyEmail = useMutation({
    mutationFn: AuthApi.requestVerifyEmail,
  });
  const verifyEmailCode = useMutation({
    mutationFn: AuthApi.verifyEmailCode,
  });

  if (isSignedIn) {
    return {
      isSignedIn,
      signOut,
      requestVerifyEmail,
      verifyEmailCode,
    };
  } else {
    return {
      isSignedIn: false,
      emailCheck,
      passwordCheck,
      usernameCheck,
      signIn,
      signUp,
    };
  }
}
