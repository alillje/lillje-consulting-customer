import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

// Create a user slice with different actions
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("lc_ab_mb_token")
      ? jwt_decode(localStorage.getItem("lc_ab_mb_token"))
      : null,
    accessToken: localStorage.getItem("lc_ab_mb_token")
      ? localStorage.getItem("lc_ab_mb_token")
      : null,
    refreshToken: localStorage.getItem("lc_ab_mb_refresh_token")
      ? localStorage.getItem("lc_ab_mb_refresh_token")
      : null,
    auth: localStorage.getItem("lc_ab_mb_token") ? true : false,
    admin: localStorage.getItem("lc_ab_mb_refresh_token") ? jwt_decode(localStorage.getItem("lc_ab_mb_token")).admin : null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.refreshToken = action.payload.refresh_token;
      state.accessToken = action.payload.access_token
      state.auth = true;
      state.admin = jwt_decode(action.payload.access_token).admin
    },
    logout: (state) => {
      state.user = null;
      state.refreshToken = null;
      state.accessToken = null
      state.auth = false;
      state.admin = false

    },
    refresh: (state, action) => {
      state.user = action.payload.user;
      state.refreshToken = action.payload.refresh_token;
      state.accessToken = action.payload.access_token;
      state.auth = true;
      state.admin = jwt_decode(action.payload.access_token).admin

    },
  },
});

export const { login, logout, refresh } = userSlice.actions;
export default userSlice.reducer;
