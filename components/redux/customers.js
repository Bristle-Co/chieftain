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
  customerInUse: {
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
    setCustomerInUse: (state, action) => {
      state.customerInUse = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCustomers, clearCustomers, setCustomerInUse } =
  customerSlice.actions;

export default customerSlice.reducer;
