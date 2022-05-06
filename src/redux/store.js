import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import transactionsReducer from "./reducers/transactions";
import transactionReducer from "./reducers/transaction";
import customerReducer from "./reducers/customer";
import customersReducer from "./reducers/customer";


// Create a new store that stores all reducers
const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    transaction: transactionReducer,
    customer: customerReducer,
    customers: customersReducer
  }, 
});

export default store;
