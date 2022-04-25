import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { refresh, logout } from "../redux/reducers/user";
import axiosApiInstance from "../services/axios-interceptor"

import axios from "axios";
import jwt_decode from "jwt-decode";

const ProtectedRoute = () => {
  // let auth = false;
  let [auth, setAuth] = useState(false);

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

    // Check expiry time of access_token and refresh if necessary
    // TODO: This might be unnecessary as we're already checking every request with interceptor
    // let timeNow = Math.floor(Date.now().valueOf() / 1000);
    // console.log(state.user.user?.exp - timeNow)
    //   const refreshToken = async () => {
    //     try {
    //       const configBody = JSON.stringify({
    //         refreshToken: state.user.refreshToken,
    //       });
    //       const res = await axios.post("/api/v1/refresh", configBody, {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });

    //       if (res.status === 200) {
    //         localStorage.setItem("lc_ab_mb_token", res.data.access_token);
    //         localStorage.setItem("lc_ab_mb_refresh_token", res.data.access_token);
    //         console.log(res.data.access_token);
    //         dispatch(
    //           refresh({
    //             user: jwt_decode(res.data.access_token),
    //             access_token: res.data.access_token,
    //             refresh_token: res.data.refresh_token
    //           })
    //         );
    //         setAuth(true);
    //       }
    //     } catch (error) {
    //       setAuth(false);
    //       dispatch(logout());
    //     }
    //   };
    

    // if (state.user.user?.exp - timeNow < 10) {

    // refreshToken();

    // }


  if (state.user?.auth) {
    auth = true;
  }
  console.log('PROTECTED ROUTE')
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
