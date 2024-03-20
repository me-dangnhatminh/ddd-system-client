import { Box, Button, Card, Container, Link, Typography } from "@mui/joy";
import DigitInput, { DigitInputElement } from "./DigitInput";
import { useRef, useState } from "react";

export interface ICodeValueProps {
  value: string;
  isValid: boolean;
}

export interface VerifyEmailControlPros {
  email: string;
  verifyError?: string;
  verifyIsPending?: boolean;
  onCodeChange?: (value: ICodeValueProps) => void;
  onVerifyClick?: (props: { email: string; code: ICodeValueProps }) => void;
  onChangeEmailClick?: () => void;
  onResendClick?: () => void;
}
function VerifyEmailControl({
  email,
  verifyError,
  verifyIsPending,
  onCodeChange,
  onVerifyClick,
  onResendClick,
  onChangeEmailClick,
}: VerifyEmailControlPros) {
  const digitInput = useRef<DigitInputElement | null>(null);

  const [code, setCode] = useState({
    value: "",
    isValid: false,
  });

  return (
    <Container maxWidth="sm">
      <Card>
        <Typography>You're almost done!</Typography>
        <Typography>
          We sent a launch code to{" "}
          <b style={{ fontWeight: "bold" }}>{email || "your email"}</b>.
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
          onChange={(value) => {
            const isValid = value.length === 6 && !isNaN(Number(value));
            setCode({ value, isValid });
            onCodeChange?.({ value, isValid });
          }}
        />
        <Button
          size="sm"
          variant="outlined"
          onClick={() => onVerifyClick?.({ email, code })}
          disabled={!code.isValid}
          loading={verifyIsPending ?? false}
          color="neutral"
        >
          Verify
        </Button>
      </Card>
      <Box sx={{ mt: 2 }}>
        <Typography level="body-sm" textAlign={"center"}>
          Didn't receive the email?{" "}
          <Link
            children={verifyIsPending ? "Resending..." : "Resend"}
            onClick={() => {
              onResendClick?.();
              digitInput.current?.clearValues();
            }}
          />{" "}
          or <Link children="change your email" onClick={onChangeEmailClick} />
        </Typography>
      </Box>
    </Container>
  );
}

export default VerifyEmailControl;

