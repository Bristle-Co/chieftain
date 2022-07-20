import { createSlice } from "@reduxjs/toolkit";

// must have a initial state else next.js will encounter html component mismatch
// see: https://stackoverflow.com/questions/47017424/warning-did-not-expect-server-html-to-contain-a-li-in-ul-in-react-redux-se
const initialState = {
  orders: [
    {
      orderID: null,
      customerOrderId: "PO customerOrderId",
      customerId: "達創",
      dueDate: "2022-03-30",
      note: "note11111111",
      deliveredAt: null,
      issuedAt: null,
      productEntries: [
        {
          productEntryId: null,
          model: "complete new model 3",
          quantity: 11,
          price: 1000,
          productTicket_id: "test ticket id6",
        },
      ],
    },
  ],
  // request is kept in cache so pagination parameters are not lost after navigating to different pages
  request: {
    method: "GET",
    url: "/order",
    baseURL: process.env.backendServerBaseURI,
    params: {},
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.customers = action.payload;
    },
    clearOrders: (state) => {
      state.customers = [];
    },
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    },
    resetOrderRequestToDefault: (state) => {
      state.request.params = {
        //TODO put actual get request param
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrders,
  clearOrders,
  setOrderRequest,
  resetOrderRequestToDefault,
} = orderSlice.actions;

export default orderSlice.reducer;
