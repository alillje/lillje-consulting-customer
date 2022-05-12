import { createSlice } from "@reduxjs/toolkit";

// Create a user slice with different actions
export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    id: null,
    company: null,
  },
  reducers: {
    setStateCustomer: (state, action) => {
      state.id = action.payload.customer;
      state.company = action.payload.company;
    },
    clearStateCustomer: (state) => {
      state.id = null;
      state.company = null;
    }
  },
});

export const { setStateCustomer, clearStateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
