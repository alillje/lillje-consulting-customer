/**
 * Redux customers module.
 * Create a customers slice with different actions
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'

export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: []
  },
  reducers: {
    /**
     * Sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    setStateCustomers: (state, action) => {
      state.customers = action.payload.customers
    },
    /**
     * Clears all state variables to values and sets the to initialState.
     *
     * @param {object} state - Redux state object.
     */
    clearStateCustomers: (state) => {
      state.customers = []
    }
  }
})

export const { setStateCustomers, clearStateCustomers } =
  customersSlice.actions
export default customersSlice.reducer
