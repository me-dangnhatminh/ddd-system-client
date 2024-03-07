import { lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

enum RoutesPath {
  HOME = "/",
  LOGIN = "/login",
}

const routes: RouteObject[] = [
  {
    path: RoutesPath.HOME,
    Component: lazy(() => import("../pages/HomePage")),
  },
  {
    path: RoutesPath.LOGIN,
    Component: lazy(() => import("../pages/LoginPage")),
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
