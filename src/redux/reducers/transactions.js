import { createSlice } from "@reduxjs/toolkit";

// Create a user slice with different actions
export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: null,
    sub: null
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
      state.sub = action.payload.sub;
    },
    clearTransactions: (state) => {
      state.transactions = null;
      state.sub = null;
    }
  },
});

export const { setTransactions, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
