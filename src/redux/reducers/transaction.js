import { createSlice } from "@reduxjs/toolkit";

// Create a user slice with different actions
export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    id: null,
    sub: null
  },
  reducers: {
    setTransaction: (state, action) => {
      state.id = action.payload.id;
      state.sub = action.payload.sub;
    },
    clearTransaction: (state) => {
      state.id = null;
      state.sub = null;
    }
  },
});

export const { setTransaction, clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
