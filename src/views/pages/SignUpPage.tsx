import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DoneIcon from "@mui/icons-material/Check";
import {
  useEmailValidityChecks,
  usePassvalidityChecks,
  useSignUp,
  useUser,
  useUsernameValidityChecks,
} from "../../hooks";
import { Navigate } from "react-router-dom";

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
// how to alway return a new object
const initUsedValue = (): IUsedValue => ({ value: "", isValid: false });

function SignUpPage() {
  const signUp = useSignUp();
  const user = useUser(signUp.isSuccess);

  const emailValidity = useEmailValidityChecks();
  const passValidity = usePassvalidityChecks();
  const usernameValidity = useUsernameValidityChecks();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState(initUsedValue());
  const [passValue, setPassValue] = useState(initUsedValue());
  const [usernameValue, setUsernameValue] = useState(initUsedValue());
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
    if (usernameValidity.isSuccess) {
      setUsernameValue((prev) => ({ ...prev, isValid: true }));
      setErrorMsg(null);
    } else if (usernameValidity.error) {
      setUsernameValue((prev) => ({ ...prev, isValid: false }));
      setErrorMsg(usernameValidity.error.message);
    }
  }, [usernameValidity.isSuccess, usernameValidity.error]);

  useEffect(() => {
    if (emailValidity.isSuccess) {
      setEmailValue((prev) => ({ ...prev, isValid: true }));
      setErrorMsg(null);
    } else if (emailValidity.error) {
      setEmailValue((prev) => ({ ...prev, isValid: false }));
      setErrorMsg(emailValidity.error.message);
    }
  }, [emailValidity.isSuccess, emailValidity.isError]);

  useEffect(() => {
    if (passValidity.isSuccess) {
      setPassValue((prev) => ({ ...prev, isValid: true }));
      setErrorMsg(null);
    } else if (passValidity.error) {
      setPassValue((prev) => ({ ...prev, isValid: false }));
      setErrorMsg(passValidity.error.message);
    }
  }, [passValidity.isSuccess, passValidity.error]);

  if (user.data) return <Navigate to="/" />;

  return (
    <Container maxWidth="sm">
      <Card variant="plain" sx={{ bgcolor: "transparent" }}>
        <Typography level="body-sm">
          Already have an account?{" "}
          <Link color="primary" href="/signin" children="Sign In" />
        </Typography>
      </Card>
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
                emailValidity.mutateDebounce(value);
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
                passValidity.mutateDebounce(value);
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
                usernameValidity.mutateDebounce(value);
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
