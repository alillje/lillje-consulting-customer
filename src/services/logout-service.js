/**
 * Logout service module
 * Handles the login request with API
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

import store from '../redux/store'
import { logout } from '../redux/reducers/user'
import { hideSidemenu } from '../redux/reducers/sidemenu'
import axios from 'axios'

/**
 * Logs a user out by setting Redux state to initialState, and destroying refresh token.
 *
 */
export const logoutHandler = async () => {
  const refreshTokenToDelete = {
    refreshToken: store.getState().user.refreshToken
  }
  try {
    await axios.post(
      `${process.env.REACT_APP_AUTH_API}/logout`,
      refreshTokenToDelete,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    window.localStorage.removeItem('lc_ab_mb_token')
    window.localStorage.removeItem('lc_ab_mb_refresh_token')
    store.dispatch(logout())
    store.dispatch(hideSidemenu())
  } catch (error) {
    window.localStorage.removeItem('lc_ab_mb_token')
    window.localStorage.removeItem('lc_ab_mb_refresh_token')
    store.dispatch(logout())
    store.dispatch(hideSidemenu())
  }
}
