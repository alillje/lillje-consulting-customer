import axios from "axios";
import store from "../redux/store";
import jwt_decode from "jwt-decode";
import { refresh } from "../redux/reducers/user";


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
      })
    );
    error.config.headers['Authorization'] = 'Bearer ' + res.data.access_token
    error.config.headers['Content-Type'] = 'application/json'

    return await axios.request(error.config)

  }
    return Promise.reject(error);

  
  
});









// Response interceptor for API calls
// axiosApiInstance.interceptors.request.use((config) => {
//   console.log('request')

//     return config;
// }, async function (error) {
//   console.log('Request error!!!')
//   console.log(error.config)
//     const configBody = JSON.stringify({
//       refreshToken: store.getState().user.refreshToken,
//     });
//     console.log(store.getState().user.refreshToken)
//     const res = axios.post("/api/v1/refresh", configBody, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     localStorage.setItem("lc_ab_mb_token", res.data.access_token);
//     localStorage.setItem("lc_ab_mb_refresh_token", res.data.refresh_token)
//     console.log(res.data);
//     store.dispatch({
//       user: jwt_decode(res.data.access_token),
//       access_token: res.data.access_token,
//       refresh_token: res.data.refresh_token
//     })

//     error.config.headers.Authorization = `Bearer: ${store.getState().user.accessToken}`
//     console.log('SÅ NÄRA NU!')
//     return axios.post(error.config)
  
// });

// axios.interceptors.response.use(function (response) {

// console.log('Response is OK!')
    

//   return response;
// }, async function (error) {
//   console.log(error.config)
//   if (error.request.status === 401  && error.config && !error.config.__isRetryRequest) {
//     const configBody = JSON.stringify({
//       refreshToken: store.getState().user.refreshToken,
//     });
//     console.log('HÄR ÄR VI 1')

//     const res = await axiosApiInstance.post("/api/v1/refresh", configBody, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log('HÄR ÄR VI 2')

//     localStorage.setItem("lc_ab_mb_token", res.data.access_token);
//     localStorage.setItem("lc_ab_mb_refresh_token", res.data.refresh_token)
//     store.dispatch({
//       user: jwt_decode(res.data.access_token),
//       access_token: res.data.access_token,
//       refresh_token: res.data.refresh_token
//     })

//     error.config.headers.Authorization = `Bearer: ${res.data.access_token}`
//     console.log('SÅ NÄRA NU!')
//     return await axios.request(error.config)
//   }
//   return Promise.reject(error);
  
// });

export default axiosApiInstance;