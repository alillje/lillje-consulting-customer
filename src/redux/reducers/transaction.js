/**
 * Redux transaction module.
 * Create a transaction slice with different actions.
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    id: null,
    sub: null
  },
  reducers: {
    /**
     * Sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    setTransaction: (state, action) => {
      state.id = action.payload.id
      state.sub = action.payload.sub
    },
    /**
     * Clears all state variables to values and sets the to initialState.
     *
     * @param {object} state - Redux state object.
     */
    clearTransaction: (state) => {
      state.id = null
      state.sub = null
    }
  }
})

export const { setTransaction, clearTransaction } = transactionSlice.actions
export default transactionSlice.reducer
