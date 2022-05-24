/**
 * Redux user module.
 * Create a user slice with different actions
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: window.localStorage.getItem('lc_ab_mb_token') ? jwt_decode(window.localStorage.getItem('lc_ab_mb_token')) : null,
    accessToken: window.localStorage.getItem('lc_ab_mb_token') ? window.localStorage.getItem('lc_ab_mb_token') : null,
    refreshToken: window.localStorage.getItem('lc_ab_mb_refresh_token') ? window.localStorage.getItem('lc_ab_mb_refresh_token') : null,
    auth: window.localStorage.getItem('lc_ab_mb_token'),
    admin: window.localStorage.getItem('lc_ab_mb_refresh_token') ? jwt_decode(window.localStorage.getItem('lc_ab_mb_token')).admin : null
  },
  reducers: {
    /**
     * Dispatched on user login and sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    login: (state, action) => {
      state.user = action.payload.user
      state.refreshToken = action.payload.refresh_token
      state.accessToken = action.payload.access_token
      state.auth = true
      state.admin = jwt_decode(action.payload.access_token).admin
    },
    /**
     * Dispatched on user logout and sets all state variables to initialState.
     *
     * @param {object} state - Redux state object.
     */
    logout: (state) => {
      state.user = null
      state.refreshToken = null
      state.accessToken = null
      state.auth = false
      state.admin = false
    },
    /**
     * Dispatched when user refresh an accessToken and sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    refresh: (state, action) => {
      state.user = action.payload.user
      state.refreshToken = action.payload.refresh_token
      state.accessToken = action.payload.access_token
      state.auth = true
      state.admin = jwt_decode(action.payload.access_token).admin
    }
  }
})

export const { login, logout, refresh } = userSlice.actions
export default userSlice.reducer
