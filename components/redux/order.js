import { createSlice } from "@reduxjs/toolkit";

// must have a initial state else next.js will encounter html component mismatch
// see: https://stackoverflow.com/questions/47017424/warning-did-not-expect-server-html-to-contain-a-li-in-ul-in-react-redux-se
const initialState = {
  orders: [
    {
      orderId: 0,
      customerOrderId: "無資料",
      customerId: "無資料",
      dueDate: "無資料",
      note: "無資料",
      deliveredAt: "無資料",
      issuedAt: "無資料",
      productEntries: [
        {
          productEntryId: "無資料",
          model: "無資料",
          quantity: 0,
          price: 0,
          productTicket_id: "無資料",
        },
      ],
    },
  ],
  // request is kept in cache so pagination parameters are not lost after navigating to different pages
  orderRequest: {
    method: "GET",
    url: "/order",
    baseURL: process.env.backendServerBaseURI,
    params: {
      // this is an integer field

      pageIndex: 0,
      pageSize: process.env.globalPageSize,
    },
  },
};

// all available params
// params: {
//   orderId:"",
//   customerOrderId:"",
//   customerId: "",
//   dueDateFrom: "",
//   dueDateTo: "",
//   issuedAtFrom: "",
//   issuedAtTo: "",
//   pageIndex: 0,
//   pageSize: process.env.globalPageSize,
// }

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    resetOrderRequestToDefault: (state) => {
      state.orderRequest.params = {
        pageIndex: 0,
        pageSize: process.env.globalPageSize,
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
