import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: {
        user: null,
        auth: false
}},
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.auth = true;
        }
    }
    
})

export const { login } = userSlice.actions
export default userSlice.reducer