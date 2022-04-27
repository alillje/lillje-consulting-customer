import axios from "axios";
import store from "../redux/store";
import jwt_decode from "jwt-decode";
import { refresh, logout } from "../redux/reducers/user";


const axiosApiInstance = axios.create();



axiosApiInstance.interceptors.request.use((config) => {
  console.log('Request OK')
  console.log(config)
    return config;
}, function (error) {
  console.log('Request error!')
  return Promise.reject(error);

});

axiosApiInstance.interceptors.response.use(function (response) {

console.log('Response is OK!')
    

  return response;
}, async function (error) {

  console.log('Response Error!')
  const originalConfig = error.config;

  if (error.request.status === 401 && error.config && !originalConfig._retry) {
    
    const configBody = JSON.stringify({
      refreshToken: store.getState().user.refreshToken,
    });

    const res = await axiosApiInstance.post("/api/v1/refresh", configBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.setItem("lc_ab_mb_token", res.data.access_token);
    localStorage.setItem("lc_ab_mb_refresh_token", res.data.refresh_token)
    store.dispatch(
      refresh({
        user: jwt_decode(res.data.access_token),
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        admin: jwt_decode(res.data.access_token).admin,

      })
    );
    error.config.headers['Authorization'] = 'Bearer ' + res.data.access_token
    error.config.headers['Content-Type'] = 'application/json'

    return await axios.request(error.config)

  }

  // store.dispatch(
  //   logout()
  // );
    return Promise.reject(error);

  
  
});

export default axiosApiInstance;