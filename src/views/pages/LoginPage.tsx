import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../../api/http-rest/auth/auth.api";
import { Navigate } from "react-router-dom";
import { ApiResponseError } from "../../api/http-rest/api-response";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState<null | string>(null);

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setErrormsg(null);
    event.preventDefault();
    if (isPending) return;
    mutate({ email, password });
  };

  // if (isSuccess) return <Navigate to="/home" />;

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {isPending && <p>Loading...</p>}
      {isSuccess && <p style={{ color: "green" }}>Login successful</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
}

export default LoginPage;
