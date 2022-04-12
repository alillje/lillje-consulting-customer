import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('lc_ab_mb_token') ? localStorage.getItem('lc_ab_mb_token') : null,
        auth: false
},
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.auth = true;
        },
        logout: (state) => {
            state.user = null;
            state.auth = false;
        }
    }
    
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer