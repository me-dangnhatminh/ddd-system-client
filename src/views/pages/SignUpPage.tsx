import { useMemo, useState } from "react";
import { Container } from "@mui/joy";
import { useEmailValidityChecks } from "../../contexts/auth/auth.hook";
import { debounce } from "lodash";

function SignUpPage() {
  const {
    mutate: emailMutate,
    error: emailError,
    isSuccess: emailValid,
  } = useEmailValidityChecks();

  const checkEmail = useMemo(
    () => debounce((email: string) => emailMutate(email), 700),
    [emailMutate]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    checkEmail(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <input
          style={{
            backgroundColor: emailValid
              ? "lightgreen"
              : emailError
              ? "red"
              : "white",
          }}
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <p>{emailError?.message}</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </Container>
  );
}

export default SignUpPage;
