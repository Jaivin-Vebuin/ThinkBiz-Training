import { Navigate, Outlet } from "react-router";
import useUser from "../hooks/useUser";

const ProtectedRoute = () => {
  const user = useUser();
  const isLoggedin = user.isLoggedIn;

  if (!isLoggedin) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
