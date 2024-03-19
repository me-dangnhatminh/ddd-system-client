import { useEffect, useRef, useState } from "react";
import { Container, Card, Typography, Link, Box, Button } from "@mui/joy";
import DigitInput, { DigitInputElement } from "../containers/singup/DigitInput";
import { useMe } from "../../contexts/auth/user.hook";
import { useNavigate } from "react-router-dom";
import {
  useRequestVerifyEmail,
  useVerifyEmailCode,
} from "../../contexts/auth/auth.hook";

interface CodeValueProps {
  value: string;
  isValid: boolean;
}

function VerifyEmailPage() {
  const getMe = useMe();
  const reqVerify = useRequestVerifyEmail();
  const verifyCode = useVerifyEmailCode();
  const navigate = useNavigate();

  const digitInput = useRef<DigitInputElement | null>(null);

  const [code, setCode] = useState<CodeValueProps>({
    value: "",
    isValid: false,
  });

  const [verifyError, setVerifyError] = useState<string | null>(null);

  // if (getMe.isError) throw getMe.error;
  // if (reqVerify.isError) throw reqVerify.error;

  const handleResend = () => {
    if (reqVerify.isPending) return;
    if (verifyCode.isPending) return;
    if (!getMe.isSuccess) return;
    reqVerify.mutate({ email: getMe.data.email });
    digitInput.current?.clearValues();
    setVerifyError(null);
  };

  const handleChangeEmail = () => navigate("/profile");

  const handleCodeChange = (value: string) => {
    const isValid = value.length === 6 && !isNaN(Number(value));
    setCode({ value, isValid });
    setVerifyError(null);
  };

  const handleVerify = () => {
    if (verifyCode.isPending) return;
    if (!code.isValid) return;
    if (!getMe.isSuccess) return;
    verifyCode.mutate({ email: getMe.data.email, code: code.value });
  };

  useEffect(() => {
    if (verifyCode.isError) {
      setVerifyError(verifyCode.error.message);
      setCode({ value: "", isValid: false });
    }
  }, [verifyCode.isError, verifyCode.error]);

  if (getMe.isPending) return <>loading...</>;
  if (getMe.data.isVerified) navigate("/");
  if (verifyCode.isSuccess) navigate("/");

  return (
    <Container maxWidth="sm">
      <Card>
        <Typography>You're almost done!</Typography>
        <Typography>
          We sent a launch code to <b>{getMe.data.email}</b>.
        </Typography>
        <Typography
          sx={{ display: verifyError ? undefined : "none" }}
          level="body-sm"
          color="danger"
          children={verifyError}
        />
        <DigitInput
          ref={digitInput}
          digitSize={6}
          onChange={handleCodeChange}
        />
        <Button
          size="sm"
          variant="outlined"
          onClick={handleVerify}
          disabled={!code.isValid}
          loading={verifyCode.isPending}
          color="neutral"
        >
          Verify
        </Button>
      </Card>
      <Box sx={{ mt: 2 }}>
        <Typography level="body-sm" textAlign={"center"}>
          Didn't receive the email?{" "}
          <Link
            children={reqVerify.isPending ? "Sending..." : "Resend"}
            onClick={handleResend}
          />{" "}
          or <Link children="change your email" onClick={handleChangeEmail} />
        </Typography>
      </Box>
    </Container>
  );
}

export default VerifyEmailPage;
