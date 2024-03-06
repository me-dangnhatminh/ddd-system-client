import { lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

enum RoutesPath {
  HOME = "/home",
  LOGIN = "/login",
}

const routes: RouteObject[] = [
  {
    path: "/",
    Component: lazy(() => import("../pages/HomePage")),
  },
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

const privateRoutes: RouteObject[] = [
  {
    path: "/admin",
    Component: lazy(() => import("../pages/AdminPage")),
  },
];

function getRoutes(role: "admin" | "user") {
  const _routes = [...routes];
  if (role === "admin") _routes.push(...privateRoutes);
  _routes.push(...errorRoutes);

  return _routes;
}

export const rootRouter = createBrowserRouter(getRoutes("admin"));
