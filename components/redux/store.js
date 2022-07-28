import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customers.js";
import pageMetaDataReducer from "./pageMetaData.js";
import orderReducer from "./order.js";

const store = configureStore({
  reducer: {
    // this name must match the name of the initial state field
    customers: customerReducer,
    customerRequest: customerReducer,
    pageMetaData: pageMetaDataReducer,
    orders: orderReducer,
    cachedProductEntries: orderReducer,
    orderRequest: orderReducer,
  },
});

export default store;
