import { useEffect, useState } from "react";
import { Container } from "@mui/joy";
import { useSignUp } from "../../contexts/auth/auth.hook";
import { isValidationError } from "../../api/http-rest/api-error.dto";

function SignUpPage() {
  const [invalid, setInvalid] = useState<Map<string, string>>(new Map());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = useSignUp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp.mutate({ firstName, lastName, email, password });
  };

  useEffect(() => {
    if (!signUp.isError) return;
    const error = signUp.error;
    if (isValidationError(error)) {
      setInvalid(new Map(error.invalidParams.map((e) => [e.name, e.reason])));
    }
  }, [signUp.isError, signUp.error]);

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <p>{invalid.get("firstName")}</p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <p>{invalid.get("lastName")}</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <p>{invalid.get("email")}</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <p>{invalid.get("password")}</p>
        <button type="submit">Sign Up</button>
      </form>
    </Container>
  );
}

export default SignUpPage;
