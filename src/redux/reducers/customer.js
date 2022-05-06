import { createSlice } from "@reduxjs/toolkit";

// Create a user slice with different actions
export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    id: null
  },
  reducers: {
    setStateCustomer: (state, action) => {
      state.id = action.payload.customer;
    },
    clearStateCustomer: (state) => {
      state.id = null;
    }
  },
});

export const { setStateCustomer, clearStateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
