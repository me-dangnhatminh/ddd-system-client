import { lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

enum RoutesPath {
  HOME = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  VERIFY_EMAIL = "/verify-email",
  PROFILE = "/profile",
}

const routes: RouteObject[] = [
  {
    path: RoutesPath.HOME,
    Component: lazy(() => import("../pages/HomePage")),
  },
  {
    path: RoutesPath.SIGN_IN,
    Component: lazy(() => import("../pages/SignInPage")),
  },
  {
    path: RoutesPath.SIGN_UP,
    Component: lazy(() => import("../pages/SignUpPage")),
  },
  {
    path: RoutesPath.VERIFY_EMAIL,
    Component: lazy(() => import("../pages/VerifyEmailPage")),
  },
  {
    path: RoutesPath.PROFILE,
    Component: lazy(() => import("../pages/ProfilePage")),
  },
];

const errorRoutes: RouteObject[] = [
  {
    path: "/404",
    Component: lazy(() => import("../pages/errors/NotFoundPage")),
  },
  {
    path: "/500",
    Component: lazy(() => import("../pages/errors/ServerErrorPage")),
  },
  {
    path: "*",
    Component: lazy(() => import("../pages/errors/NotFoundPage")),
  },
];

function getRoutes() {
  return [...routes, ...errorRoutes];
}

export const rootRouter = createBrowserRouter(getRoutes());
