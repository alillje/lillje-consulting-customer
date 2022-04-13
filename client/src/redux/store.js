import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/user'

// Create a new store that stores all reducers
const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store