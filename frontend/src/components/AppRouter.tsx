import { useUserStore } from "../stores/userStore";
import { routes } from "../router";
import { Route, Routes } from "react-router-dom";
import { isBlank, present } from "@/utils/presence.ts";

const renderRoute = (route, user) => {
  if (route.isPrivate && isBlank(user)) return null;
  if (route.isAdminOnly && (!user || user.admin !== true)) return null;

  if (present(route.children)) {
    return (
      <Route key={route.element?.type?.name || 'layout'} element={route.element}>
        {route.children.map((child) =>
          (!child.isPrivate || present(user)) &&
          (!child.isAdminOnly || (user && user.admin === true)) ? (
            <Route key={child.path} path={child.path} element={child.element} />
          ) : null
        )}
      </Route>
    );
  }

  return (
    <Route key={route.path} path={route.path} element={route.element} />
  );
};

const AppRouter = () => {
  const { user } = useUserStore();

  return <Routes>{routes.map((route) => renderRoute(route, user))}</Routes>;
};

export default AppRouter;
