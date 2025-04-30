import { useUser } from "../contexts/UserContext";
import { routes } from "../router";
import { Route, Routes } from "react-router-dom";

const renderRoute = (route, user) => {
  if (route.isPrivate && !user) return null;

  if (route.children) {
    return (
      <Route key={route.element?.type?.name || 'layout'} element={route.element}>
        {route.children.map((child) =>
          !child.isPrivate || user ? (
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
  const { user } = useUser();

  return <Routes>{routes.map((route) => renderRoute(route, user))}</Routes>;
};

export default AppRouter;
