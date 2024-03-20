import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import SignInForm, { SignInCredentials } from "../components/SignInForm";
import SignInThirtySeviceContainer from "./SignInThirtySeviceContainer";
import { isValidationError } from "../../api/http-rest/api.dto";
import * as AuthApi from "../../api/http-rest/auth";
import { useMutation } from "@tanstack/react-query";

function SignInFormContainer() {
  const signIn = useMutation({ mutationFn: AuthApi.signIn });

  const [error, setError] = useState<{
    responseError?: string;
    invalidParams?: { email?: string; password?: string };
  }>();

  const handleInputFocus = () => setError(undefined);

  const handleSubmit = (cres: SignInCredentials) => {
    if (signIn.isPending) return;
    signIn.mutate(cres);
  };

  useEffect(() => {
    if (signIn.isPending) setError(undefined);
  }, [signIn.isPending]);

  useEffect(() => {
    if (!signIn.isError) return;
    const error = signIn.error;
    if (isValidationError(error))
      setError({ invalidParams: AuthApi.invalidParamsToCredentials(error) });
    else setError({ responseError: error.message });
  }, [signIn.error, signIn.isError]);

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
