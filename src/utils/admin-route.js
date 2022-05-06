import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  let notAdmin = false;
  let admin = false;
  let unAuthorized = true;

  const user = useSelector((state) => state.user);

  if (user?.auth && user?.admin) {
    admin = true;
  } else if (user?.auth) {
    notAdmin = true;
  }

  console.log("ADMIN ROUTE");
  if (admin) {
    return <Outlet />;
  } else if (notAdmin) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }

  //   {admin && <Outlet />}
  //   {notAdmin && <Navigate to="/dashboard" />};
};

export default AdminRoute;
