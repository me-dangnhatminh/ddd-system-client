import { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type OnSignInSubmitProps = {
  credentials: SignInCredentials;
};

export type SubmitError = {
  responseError?: string;
  invalidParams?: { email?: string; password?: string };
};

export type SignInFormProps = {
  isSumitting?: boolean;
  error?: SubmitError;
  forgPassUrl?: string;
  signUpUrl?: string;
  registerUrl?: string;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement> & { field: "email" | "password" }
  ) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> & { field: "email" | "password" }
  ) => void;
  onSubmit?: (cres: SignInCredentials) => void;
};

function SignInForm({
  error,
  isSumitting,
  forgPassUrl,
  signUpUrl,
  onFocus,
  onChange,
  onSubmit,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Stack gap={1}>
            <Typography level="h3">Sign In</Typography>
            <Typography level="body-sm">
              Don&apos;t have an account? <Link href={signUpUrl}>Sign Up!</Link>
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <FormControl error={Boolean(error?.invalidParams?.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              onFocus={(e) => onFocus?.({ ...e, field: "email" })}
              onChange={(e) => {
                setEmail(e.target.value);
                onChange?.({ ...e, field: "email" });
              }}
              value={email}
            />
            <FormHelperText children={error?.invalidParams?.email} />
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl error={Boolean(error?.invalidParams?.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              onFocus={(e) => onFocus?.({ ...e, field: "password" })}
              onChange={(e) => {
                setPassword(e.target.value);
                onChange?.({ ...e, field: "password" });
              }}
              value={password}
            />
            <FormHelperText children={error?.invalidParams?.password} />
          </FormControl>
        </Grid>

        <Grid xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Link href={forgPassUrl}>
              <Typography level="body-sm">Forgot Password?</Typography>
            </Link>
          </Box>
        </Grid>

        {error?.responseError && (
          <Grid
            xs={12}
            children={<ErrorMessage error={error.responseError} />}
          />
        )}

        <Grid xs={12}>
          <Button type="submit" variant="solid" fullWidth loading={isSumitting}>
            Sign In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

function ErrorMessage({ error = "" }) {
  return (
    <Card variant="soft" size="sm" color="danger">
      {error}
    </Card>
  );
}

export default SignInForm;
