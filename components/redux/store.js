import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customers.js";

const store = configureStore({
  reducer: {
    // this name must match the name of the initial state field
    customers: customerReducer,
    customerInUse: customerReducer,
    request: customerReducer,
  },
});

export default store;
