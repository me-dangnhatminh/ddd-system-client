import { useState, useEffect } from "react";
import { useSignIn } from "../../contexts/auth/auth.hook";
import { validAuthCredentials } from "../../api/http-rest/auth";
import SignInForm, { SignInCredentials } from "../components/SignInForm";

//TODO: Move to utils
function getCredentialsError(credentials: { email: string; password: string }) {
  const valid = validAuthCredentials(credentials);
  if (valid.success) return undefined;
  const errors = valid.error.errors;
  const emailMess = errors.find((err) => err.path[0] === "email")?.message;
  const passMess = errors.find((err) => err.path[0] === "password")?.message;
  return { email: emailMess, password: passMess };
}

function SignInFormContainer() {
  const signIn = useSignIn();
  const [error, setError] = useState<{
    responseError?: string;
    invalidParams?: { email?: string; password?: string };
  }>();

  function handleInputFocus() {
    setError(undefined);
  }

  function handleSubmit(cres: SignInCredentials) {
    if (signIn.isPending) return;
    const error = getCredentialsError(cres);
    if (error) return setError({ invalidParams: error });
    signIn.mutate(cres);
  }

  useEffect(() => {
    if (signIn.error) setError({ responseError: signIn.error.message });
  }, [signIn.error]);

  return (
    <SignInForm
      error={error}
      isSumitting={signIn.isPending}
      onSubmit={handleSubmit}
      onFocus={handleInputFocus}
    />
  );
}
export default SignInFormContainer;
