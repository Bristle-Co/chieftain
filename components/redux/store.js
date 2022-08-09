import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customers.js";
import pageMetaDataReducer from "./pageMetaData.js";
import orderReducer from "./order.js";
import productionTicketReducer from "./productionTicket.js";

const store = configureStore({
  reducer: {
    // this name must match the name of the initial state field
    customers: customerReducer,
    customerRequest: customerReducer,
    pageMetaData: pageMetaDataReducer,
    order: orderReducer,
    productionTicket: productionTicketReducer,
  },
});

export default store;
