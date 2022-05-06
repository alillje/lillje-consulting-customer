import { createSlice } from "@reduxjs/toolkit";

// Create a user slice with different actions
export const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
  },
  reducers: {
    setStateCustomers: (state, action) => {
      state.customers = action.payload.customers;
    },
    clearStateCustomers: (state) => {
      state.customers = [];
    }
  },
});

export const { setStateCustomers, clearStateCustomers } = customersSlice.actions;
export default customersSlice.reducer;
