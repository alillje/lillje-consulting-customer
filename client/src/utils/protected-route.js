import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  let auth = false; // determine if authorized, from context or however you're doing it
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  // let { contextData } = useContext(AuthContext)

  const user = useSelector((state) => state.user);

  if (user.auth) {
    auth = true;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

// const ProtectedRoute = ({children, ...rest}) => {
//     const auth = false

//     return (
//         <Route {...rest}>{!auth ? <Navigate to="/login" /> : children}</Route>
//     )
// }

// export default ProtectedRoute;
