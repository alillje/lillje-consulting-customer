/**
 * Redux transactions module.
 * Create a transactions slice with different actions.
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: null,
    sub: null
  },
  reducers: {
    /**
     * Sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions
      state.sub = action.payload.sub
    },
    /**
     * Clears all state variables to values and sets the to initialState.
     *
     * @param {object} state - Redux state object.
     */
    clearTransactions: (state) => {
      state.transactions = null
      state.sub = null
    }
  }
})

export const { setTransactions, clearTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer
