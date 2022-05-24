/**
 * Login service module
 * Handles the login request with API
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

/* eslint-disable camelcase */
import store from '../redux/store'
import { login } from '../redux/reducers/user'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

/**
 * Makes a POST request to API. Upon successful request, logs user in and sets redux state.
 *
 * @param {object} userData - Object containing user data to send login request with.
 * @returns {object|boolean} - Returns the response object upon successful request, otherwise false.
 */
export const loginHandler = async (userData) => {
  try {
    const configBody = JSON.stringify(userData)
    const res = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/login`,
      configBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (res.status === 200) {
      window.localStorage.setItem('lc_ab_mb_token', res.data.access_token)
      window.localStorage.setItem('lc_ab_mb_refresh_token', res.data.refresh_token)

      store.dispatch(
        login({
          user: jwt_decode(res.data.access_token),
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
          auth: true,
          admin: jwt_decode(res.data.access_token).admin
        })
      )
    }
    return res.data
  } catch (error) {
    return false
  }
}
