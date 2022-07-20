import { createSlice } from "@reduxjs/toolkit";

// must have a initial state else next.js will encounter html component mismatch
// see: https://stackoverflow.com/questions/47017424/warning-did-not-expect-server-html-to-contain-a-li-in-ul-in-react-redux-se
const initialState = {
  customers: [
    {
      customerId: "",
      name: "",
      contactName: "",
      contactNumber: "",
      contactMobileNumber: "",
      faxNumber: "",
      postalCode: "",
      address: "",
      taxId: "",
      receiver: "",
      note: "",
    },
  ],
  // request is kept in cache so pagination parameters are not lost after navigating to different pages
  request: {
    method: "GET",
    url: "/customer_detail",
    baseURL: process.env.backendServerBaseURI,
    params: {
      customerId: "",
      name: "",
      contactName: "",
      contactNumber: "",
      address: "",
      pageIndex: 0,
      pageSize: process.env.globalPageSize,
    },
  },
};

export const customerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    clearCustomers: (state) => {
      state.customers = [];
    },
    setCustomerRequest: (state, action) => {
      state.request = action.payload;
    },
    resetCustomerRequestParamsToDefault: (state) => {
      state.request.params = {
        customerId: "",
        name: "",
        contactName: "",
        contactNumber: "",
        address: "",
        pageIndex: 0,
        pageSize: process.env.globalPageSize,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCustomers,
  clearCustomers,
  setCustomerRequest,
  resetCustomerRequestParamsToDefault,
} = customerSlice.actions;

export default customerSlice.reducer;
