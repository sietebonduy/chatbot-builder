import { routes } from "../router";
import { Route, Routes } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AppRouter = () => {
  const { user } = useUser();

  return (
    <Routes>
      {routes.map((route) => {
        if (route.isPrivate && !user) return null;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
