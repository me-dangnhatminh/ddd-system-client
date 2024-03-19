import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { debounce } from "lodash";
import { useCallback } from "react";
import * as AuthApi from "../api/http-rest/auth";
import * as UserApi from "../api/http-rest/user";

const REQUEST_DB = 700;

// Validity checks hooks
function useEmailValidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: AuthApi.emailValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

function usePassvalidityChecks() {
  const { mutate, ...rest } = useMutation({
    mutationFn: AuthApi.passwordValidityChecks,
  });
  const mutateDebounce = useCallback(debounce(mutate, REQUEST_DB), [mutate]);
  return { mutate, ...rest, mutateDebounce };
}

function useUsernameValidityChecks() {
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

type ISignedState = {
  userInfo: UserApi.IUserDTO;
  isSignedIn: true;
  emailChecks?: never;
  passwordChecks?: never;
  usernameChecks?: never;
  signOut: SignOutType;
  signIn?: never;
  signUp?: never;
};
interface IUnsignedState {
  userInfo?: never;
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
  const { data: userInfo } = useQuery({
    queryKey: ["me"],
    queryFn: UserApi.getMe,
  });

  const emailCheck = useEmailValidityChecks();
  const passwordCheck = usePassvalidityChecks();
  const usernameCheck = useUsernameValidityChecks();

  const signIn = useMutation({ mutationFn: AuthApi.signIn });
  const signUp = useMutation({ mutationFn: AuthApi.signUp });
  const signOut = useMutation({
    mutationFn: AuthApi.signOut,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["me"] }),
  });

  // --- Return
  if (userInfo) return { userInfo, isSignedIn: true, signOut };
  else
    return {
      isSignedIn: false,
      signIn,
      signUp,
      emailCheck,
      passwordCheck,
      usernameCheck,
    };
}
