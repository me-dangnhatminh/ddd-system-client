import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DoneIcon from "@mui/icons-material/Check";
import {
  useEmailValidityChecks,
  usePassvalidityChecks,
  useUsernameValidityChecks,
  useSignUp,
} from "../../contexts/auth/auth.hook";

function IconMark({ isValid }: { isValid: boolean }) {
  return isValid ? (
    <DoneIcon fontSize="small" color="success" />
  ) : (
    <ArrowRightAltIcon fontSize="small" />
  );
}

interface IUsedValue {
  value: string;
  isValid: boolean;
}

function SignUpPage() {
  const {
    mutateDebounce: emailCheck,
    isSuccess: isEmailSuccess,
    isError: isEmailError,
    error: emailError,
  } = useEmailValidityChecks();
  const {
    mutateDebounce: passCheck,
    isSuccess: isPassSuccess,
    isError: isPassError,
    error: passError,
  } = usePassvalidityChecks();
  const {
    mutateDebounce: usernameCheck,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
    error: usernameError,
  } = useUsernameValidityChecks();
  const signUp = useSignUp();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<IUsedValue>({
    value: "",
    isValid: false,
  });
  const [passValue, setPassValue] = useState<IUsedValue>({
    value: "",
    isValid: false,
  });
  const [usernameValue, setUsernameValue] = useState<IUsedValue>({
    value: "",
    isValid: false,
  });
  const canSubmit = useMemo(
    () => emailValue.isValid && passValue.isValid && usernameValue.isValid,
    [emailValue, passValue, usernameValue]
  );

  const handleSubmit = () => {
    if (!canSubmit || signUp.isPending) return;
    signUp.mutate({
      email: emailValue.value,
      password: passValue.value,
      username: usernameValue.value,
    });
  };

  useEffect(() => {
    if (isUsernameSuccess) {
      setUsernameValue((prev) => ({ ...prev, isValid: true }));
      setErrorMsg(null);
    } else if (isUsernameError) {
      setUsernameValue((prev) => ({ ...prev, isValid: false }));
      setErrorMsg(usernameError.message);
    }
  }, [isUsernameSuccess, isUsernameError, usernameError]);

  useEffect(() => {
    if (isPassSuccess) {
      setPassValue((prev) => ({ ...prev, isValid: true }));
      setErrorMsg(null);
    } else if (isPassError) {
      setPassValue((prev) => ({ ...prev, isValid: false }));
      setErrorMsg(passError.message);
    }
  }, [isPassSuccess, isPassError, passError]);

  useEffect(() => {
    if (isEmailSuccess) {
      setEmailValue((prev) => ({ ...prev, isValid: true }));
      setErrorMsg(null);
    } else if (isEmailError) {
      setEmailValue((prev) => ({ ...prev, isValid: false }));
      setErrorMsg(emailError.message);
    }
  }, [isEmailSuccess, isEmailError, emailError]);

  return (
    <Container maxWidth="sm">
      <Card>
        <Typography level="body-sm">Welcom to App</Typography>
        <Typography level="body-sm">Let’s begin the adventure</Typography>

        <FormControl>
          <Typography level="title-md" fontWeight={700} mb={1}>
            Enter your email
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <FormLabel
                sx={{ m: 0 }}
                children={<IconMark isValid={emailValue.isValid} />}
              />
            </Box>
            <Input
              required
              size="sm"
              variant="plain"
              type="email"
              fullWidth
              value={emailValue.value}
              onChange={(e) => {
                const value = e.target.value;
                setEmailValue({ ...emailValue, value });
                emailCheck(value);
              }}
              onFocus={() => setErrorMsg(null)}
              color={
                emailValue.isValid ? "success" : errorMsg ? "danger" : undefined
              }
            />
          </Stack>
        </FormControl>

        <FormControl sx={{ display: emailValue.isValid ? undefined : "none" }}>
          <Typography level="title-md" fontWeight={700} mb={1}>
            Create password
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <FormLabel
                sx={{ m: 0 }}
                children={<IconMark isValid={passValue.isValid} />}
              />
            </Box>
            <Input
              required
              size="sm"
              variant="plain"
              type="password"
              fullWidth
              value={passValue.value}
              onChange={(e) => {
                const value = e.target.value;
                setPassValue({ ...passValue, value });
                passCheck(value);
              }}
              onFocus={() => setErrorMsg(null)}
              color={
                passValue.isValid ? "success" : errorMsg ? "danger" : undefined
              }
            />
          </Stack>
        </FormControl>

        <FormControl
          sx={{
            display:
              passValue.isValid && emailValue.isValid ? undefined : "none",
          }}
        >
          <Typography level="title-md" fontWeight={700} mb={1}>
            Enter a username
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <FormLabel
                sx={{ m: 0 }}
                children={<IconMark isValid={usernameValue.isValid} />}
              />
            </Box>
            <Input
              required
              size="sm"
              variant="plain"
              fullWidth
              value={usernameValue.value}
              onChange={(e) => {
                const value = e.target.value;
                setUsernameValue({ ...usernameValue, value });
                usernameCheck(value);
              }}
              onFocus={() => setErrorMsg(null)}
              color={
                usernameValue.isValid
                  ? "success"
                  : errorMsg
                  ? "danger"
                  : undefined
              }
            />
            <Button
              sx={{ display: canSubmit ? undefined : "none" }}
              disabled={!canSubmit}
              onClick={handleSubmit}
              size="sm"
              variant="outlined"
              color="neutral"
              children="Continue"
            />
          </Stack>
        </FormControl>
      </Card>
      <Card
        variant="plain"
        sx={{ display: errorMsg ? undefined : "none", bgcolor: "transparent" }}
        children={
          <Typography level="body-sm" children={errorMsg} color="danger" />
        }
      />
    </Container>
  );
}

export default SignUpPage;
