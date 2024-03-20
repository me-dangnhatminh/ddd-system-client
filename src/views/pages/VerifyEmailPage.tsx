import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRequestVerifyEmail,
  useUser,
  useVerifyEmailCode,
} from "../../hooks";
import VerifyEmailControl from "../containers/signup/VerfiyEmailControl";

function VerifyEmailPage() {
  const user = useUser(true);
  const reqVerify = useRequestVerifyEmail();
  const verifyCode = useVerifyEmailCode();
  const navigate = useNavigate();

  const [verifyError, setVerifyError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (verifyCode.error) setVerifyError(verifyCode.error.message);
  }, [verifyCode.error]);

  if (user.isPending) return <div>Loading...</div>;
  if (user.isError) throw user.error;

  return (
    <VerifyEmailControl
      email={user.data.email}
      onResendClick={() => reqVerify.mutate({ email: user.data.email })}
      onChangeEmailClick={() => navigate("/signup")}
      onVerifyClick={({ email, code }) =>
        verifyCode.mutate({ email, code: code.value })
      }
      verifyIsPending={verifyCode.isPending || reqVerify.isPending}
      onCodeChange={() => setVerifyError(undefined)}
      verifyError={verifyError}
    />
  );
}

export default VerifyEmailPage;
