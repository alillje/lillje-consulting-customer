/**
 * Redux customer module.
 * Create a customer slice with different actions
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'

// Create a user slice with different actions
export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    id: null,
    company: null
  },
  reducers: {
    /**
     * Sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    setStateCustomer: (state, action) => {
      state.id = action.payload.customer
      state.company = action.payload.company
    },
    /**
     * Clears all state variables to values and sets the to initialState.
     *
     * @param {object} state - Redux state object.
     */
    clearStateCustomer: (state) => {
      state.id = null
      state.company = null
    }
  }
})

export const { setStateCustomer, clearStateCustomer } = customerSlice.actions
export default customerSlice.reducer
