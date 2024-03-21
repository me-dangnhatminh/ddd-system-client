import { useNavigate, useRouteError } from "react-router-dom";
import { RoutesPath } from "./RootRouter";

import { ApiError } from "../../api/http-rest/api.dto";

const handleErrorMessages = (error: unknown) => {
  if (error instanceof ApiError) return error.error.detail;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return "An unknown error occurred.";
};

export function RouterErrorBoundary(): JSX.Element {
  const error = useRouteError();
  const navigate = useNavigate();

  if (error instanceof ApiError) {
    const status = error.error.status;
    if (status === 401) navigate(RoutesPath.SignIn);
    if (status === 404) navigate(RoutesPath.Home);
    if (status === 500) navigate(RoutesPath.ServerError);
  }

  return <h1>{handleErrorMessages(error)}</h1>;
}
