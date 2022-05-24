/**
 * Axios Interceptor module
 * Intercepts requests responding with status code 401
 * tries to refresh/renew access_token
 * and finally retry original requests
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

/* eslint-disable camelcase */
import axios from 'axios'
import store from '../redux/store'
import jwt_decode from 'jwt-decode'
import { refresh, logout } from '../redux/reducers/user'

const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use(
  (config) => {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosApiInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    // Check if retry request is original request and is not requesting to the refresh enpoint
    // Avoiding infinite loop
    if (
      error.request.status === 401 &&
      !originalRequest._retry &&
      error.config.url !== `${process.env.REACT_APP_AUTH_API}/refresh`
    ) {
      originalRequest._retry = true
      const configBody = JSON.stringify({
        refreshToken: store.getState().user.refreshToken
      })
      // Try refresh token
      const res = await axiosApiInstance.post(
        `${process.env.REACT_APP_AUTH_API}/refresh`,
        configBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      window.localStorage.setItem('lc_ab_mb_token', res.data.access_token)
      window.localStorage.setItem('lc_ab_mb_refresh_token', res.data.refresh_token)
      store.dispatch(
        refresh({
          user: jwt_decode(res.data.access_token),
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
          admin: jwt_decode(res.data.access_token).admin
        })
      )
      error.config.headers.Authorization = 'Bearer ' + res.data.access_token
      error.config.headers['Content-Type'] = 'application/json'

      return axiosApiInstance(originalRequest)
    } else if (error.request.status === 401) {
      store.dispatch(logout())
    }
    // If refresh failure, return error
    return Promise.reject(error)
  }
)

export default axiosApiInstance
