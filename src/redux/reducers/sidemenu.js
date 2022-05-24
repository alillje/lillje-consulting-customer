/**
 * Redux sidemenu module.
 * Create a sidemenu slice with different actions
 *
 * @author Andreas Lillje <a.lillje@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'

// Create a user slice with different actions
export const sidemenuSlice = createSlice({
  name: 'sidemenu',
  initialState: {
    show: false
  },
  reducers: {
    /**
     * Sets all state variables to values defined in the action object.
     *
     * @param {object} state - Redux state object.
     * @param {object} action - Object containing the different state values to be set.
     */
    showSidemenu: (state, action) => {
      state.show = true
    },
    /**
     * Sets values to initialState.
     *
     * @param {object} state - Redux state object.
     */
    hideSidemenu: (state) => {
      state.show = false
    }
  }
})

export const { showSidemenu, hideSidemenu } = sidemenuSlice.actions
export default sidemenuSlice.reducer
