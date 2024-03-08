import { lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

enum RoutesPath {
  HOME = "/",
  SIGN_IN = "/signin",
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
