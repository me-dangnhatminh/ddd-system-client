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
import { useEmailValidityChecks } from "../../contexts/auth/auth.hook";
import { debounce } from "lodash";

interface IUsedValue {
  value: string;
  isValid: boolean;
}

function SignUpPage() {
  const {
    mutate: emailMutate,
    isSuccess: isEmailSuccess,
    isError: isEmailError,
    error: emailError,
  } = useEmailValidityChecks();

  const checkEmail = useMemo(
    () => debounce((email: string) => emailMutate(email), 700),
    [emailMutate]
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<IUsedValue>({
    value: "",
    isValid: false,
  });

  function handleEmailFocus() {
    setErrorMsg(null);
  }

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
        <Typography level="title-md" fontWeight={700}>
          Enter your email
        </Typography>
        <FormControl>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <FormLabel sx={{ m: 0 }}>
                {emailValue.isValid ? (
                  <DoneIcon fontSize="small" />
                ) : (
                  <ArrowRightAltIcon fontSize="small" />
                )}
              </FormLabel>
            </Box>
            <Input
              required
              size="sm"
              variant="plain"
              type="email"
              fullWidth
              value={emailValue.value}
              onChange={(e) => {
                const value = e.target.value; // email
                setEmailValue({ ...emailValue, value });
                checkEmail(value);
              }}
              onFocus={handleEmailFocus}
              color={
                errorMsg ? "danger" : emailValue.isValid ? "success" : undefined
              }
            />
            <Button
              sx={{ visibility: !emailValue.isValid ? "hidden" : undefined }}
              disabled={!emailValue.isValid}
              size="sm"
              variant="outlined"
              color="neutral"
              children="Continue"
            />
          </Stack>
        </FormControl>

        <FormControl>Hello</FormControl>
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
