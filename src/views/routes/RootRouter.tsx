import { lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { RouterErrorBoundary } from "./RouterErrorBoundary";

export enum RoutesPath {
  Home = "/",
  SignIn = "/signin",
  SignUp = "/signup",
  VerifyEmail = "/verify-email",
  Profile = "/profile",
  UserDetail = "/user/:id",
  NotFound = "/404",
  ServerError = "/500",
}

const routes: RouteObject[] = [
  {
    path: RoutesPath.Home,
    Component: lazy(() => import("../pages/HomePage")),
    hasErrorBoundary: true,
  },
  {
    path: RoutesPath.SignIn,
    Component: lazy(() => import("../pages/SignInPage")),
    hasErrorBoundary: true,
  },
  {
    path: RoutesPath.SignUp,
    Component: lazy(() => import("../pages/SignUpPage")),
    hasErrorBoundary: true,
  },
  {
    path: RoutesPath.VerifyEmail,
    Component: lazy(() => import("../pages/VerifyEmailPage")),
    hasErrorBoundary: true,
  },
  {
    path: RoutesPath.Profile,
    Component: lazy(() => import("../pages/ProfilePage")),
    hasErrorBoundary: true,
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

export const RootRouter = createBrowserRouter([
  { children: getRoutes(), ErrorBoundary: RouterErrorBoundary },
]);
