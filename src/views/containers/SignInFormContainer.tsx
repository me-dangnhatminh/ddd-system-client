import { useState, useEffect } from "react";

import { isValidationError } from "../../api/http-rest/api.dto";
import { invalidParamsToCredentials } from "../../api/http-rest/auth";

import { useSignIn } from "../../hooks";
import SignInForm, { SignInCredentials } from "../components/SignInForm";
import SignInThirtySeviceContainer from "./SignInThirtySeviceContainer";

function SignInFormContainer() {
  const signIn = useSignIn();

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
      setError({ invalidParams: invalidParamsToCredentials(error) });
    else setError({ responseError: error.message });
  }, [signIn.error, signIn.isError]);

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
