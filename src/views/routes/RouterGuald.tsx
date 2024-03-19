import { getMe } from "../../api/http-rest/user";
import { useLocation } from "react-router-dom";

interface RouterGualdProps {
  children?: React.ReactNode;
}

function RouterGuald({ children }: RouterGualdProps): JSX.Element {
  const user = getMe();
  const location = useLocation();

  const isAuth =
    location.pathname === "/signin" || location.pathname === "/signup";

  if (!user && !isAuth) return <h1>Redirecting...</h1>;

  return <>{children}</>;
}

export default RouterGuald;
