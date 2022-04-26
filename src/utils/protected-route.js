import {  useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = () => {
  // let auth = false;
  let auth = false

  const state = useSelector((state) => state);


  if (state.user?.auth) {
    auth = true
  }
  console.log('PROTECTED ROUTE')
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
