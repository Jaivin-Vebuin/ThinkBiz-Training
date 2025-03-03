import { Outlet } from "react-router";
import Navbar from "../organisms/Navbar";
import useUser from "../../hooks/useUser";

const DashboardLayout = () => {
  const user = useUser();

  return (
    <div>
      <Navbar role={user.currentUser?.role} currentUser={user.currentUser} />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
