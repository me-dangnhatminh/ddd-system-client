import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { login } from "../../api/http-rest/auth/auth.api";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: () => console.log("Logged in"),
    onError: (error) => console.error(error.message),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;
    mutate({ email, password });
  };

  if (isSuccess) return <Navigate to="/home" />;

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
    </div>
  );
}

export default LoginPage;
