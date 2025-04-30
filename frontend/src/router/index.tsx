import Home from "../pages/Home";
import { Authentication, PageTypes } from "../pages/Authentication";
import Hello from "../pages/Hello";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import ListUsers from "../pages/admin/users/ListUsers";
import MainLayout from "../layouts/MainLayout";

export const routes = [
  {
    path: "/login",
    element: <Authentication pageType={PageTypes.LOGIN} />,
    isPrivate: false,
  },
  {
    path: "/sign_up",
    element: <Authentication pageType={PageTypes.REGISTER} />,
    isPrivate: false,
  },

  {
    element: <MainLayout />,
    isPrivate: false,
    children: [
      { path: "/", element: <Home />, isPrivate: false },
      { path: "/hello", element: <Hello />, isPrivate: false },
      { path: "/dashboard", element: <Dashboard />, isPrivate: false },
      { path: "/admin/users", element: <ListUsers />, isPrivate: false },
      { path: "*", element: <NotFound />, isPrivate: false },
    ],
  },
];
