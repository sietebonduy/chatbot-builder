import Home from "../pages/Home.tsx";
import { Authentication, PageTypes } from "../pages/Authentication.tsx";
// import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Hello from "../pages/Hello.tsx";
import NotFound from "../pages/NotFound.tsx";
import ListUsers from "../pages/admin/users/ListUsers.tsx";


export const routes = [
  { path: "/", element: <Home />, isPrivate: false },
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
    path: "/hello",
    element: <Hello />,
    isPrivate: false,
  },
  {
    path: "/admin/users",
    element: <ListUsers />,
    isPrivate: false,
  },
  { path: "*", element: <NotFound />, isPrivate: false },
];