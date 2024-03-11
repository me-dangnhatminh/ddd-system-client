import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useSignIn } from "../../contexts/auth/auth.hook";
import { validAuthCredentials } from "../../api/http-rest/auth";
import SignInForm, { SignInCredentials } from "../components/SignInForm";
import SignInThirtySeviceContainer from "./SignInThirtySeviceContainer";

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
    if (signIn.isPending) setError(undefined);
  }, [signIn.isPending]);

  if (signIn.isSuccess) return <Navigate to="/" />;
  return (
    <>
      <SignInForm
        signUpUrl="signup"
        error={error}
        isSumitting={signIn.isPending}
        onSubmit={handleSubmit}
        onFocus={handleInputFocus}
      />
      <SignInThirtySeviceContainer isSumitting={signIn.isPending} />
    </>
  );
}
export default SignInFormContainer;
