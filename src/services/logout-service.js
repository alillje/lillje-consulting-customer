import store from "../redux/store";
import { logout } from "../redux/reducers/user";
import { hideSidemenu } from "../redux/reducers/sidemenu";

import axios from "axios";



/**
 * Makes a DELETE http request to auth-service and logs out user
 *
 * @param {*} user
 */
export const logoutHandler = async (user) => {
  
  const refreshTokenToDelete = {
    refreshToken: store.getState().user.refreshToken,
  };
  try {
await axios.post(`${process.env.REACT_APP_AUTH_API}/logout`, refreshTokenToDelete, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("lc_ab_mb_token");
    localStorage.removeItem("lc_ab_mb_refresh_token");
    store.dispatch(
      logout()
    );
    store.dispatch(
      hideSidemenu()
    );
  } catch (error) {
    localStorage.removeItem("lc_ab_mb_token");
    localStorage.removeItem("lc_ab_mb_refresh_token");
    store.dispatch(
      logout()
    );
    store.dispatch(
      hideSidemenu()
    );
    console.log(error);
  }
};
