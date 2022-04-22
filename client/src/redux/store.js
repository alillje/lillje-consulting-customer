import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import transactionsReducer from "./reducers/transactions";
import transactionReducer from "./reducers/transaction";


// Create a new store that stores all reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    transaction: transactionReducer
  }, 
});

export default store;
