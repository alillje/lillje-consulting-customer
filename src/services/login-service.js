import store from "../redux/store";
import { login } from "../redux/reducers/user";
import axios from "axios";
import jwt_decode from "jwt-decode";




/**
 * Makes a DELETE http request to auth-service and logs out user
 *
 * @param {*} user
 */
export const loginHandler = async (userData) => {


  try {

    const configBody = JSON.stringify(userData)
    const res = await axios.post(`${process.env.REACT_APP_AUTH_API}/login`, configBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (res.status === 200) {
        localStorage.setItem("lc_ab_mb_token", res.data.access_token);
        localStorage.setItem("lc_ab_mb_refresh_token", res.data.refresh_token);
        

    store.dispatch(
        login({
            user: jwt_decode(res.data.access_token),
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            auth: true,
            admin: jwt_decode(res.data.access_token).admin
          })
    );

    }
    return res.data
  } catch (error) {
    console.log(error);
    return false
  }
};
