import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  // let auth = false;
  
  let auth = false;
  let admin = false;

  const state = useSelector((state) => state);
// Check user  customer or admin or unauthorized
  if (state.user?.auth && !state.user.admin) {
    auth = true;
  } else if (state.user?.auth && state.user?.admin) {
    admin = true;
  }
  if (admin) {
    return <Navigate to="/admin/dashboard" />;
  } else if (!auth) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
