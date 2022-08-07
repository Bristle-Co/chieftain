import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const isEqualRequestParams = (org, updated) => {};
const isEqualProductEntry = (org, updated) => {
  if (
    org.model !== updated.model ||
    org.quantity !== updated.quantity ||
    org.price !== updated.price ||
    org.productTicketId !== updated.productTicketId ||
    org.productEntryId !== updated.productEntryId
  ) {
    return false;
  }
  return true;
};

const isEqualOrder = (org, updated) => {
  if (
    org.orderId !== updated.orderId ||
    org.customerOrderId !== updated.customerOrderId ||
    org.customerId !== updated.customerId ||
    org.dueDate !== updated.dueDate ||
    org.note !== updated.note ||
    org.deliveredAt !== updated.deliveredAt ||
    org.issuedAt !== updated.issuedAt
  ) {
    return false;
  }
  const unmatchedProductEntries = org.productEntries.filter(
    (item, index) => !isEqualProductEntry(item, updated.productEntries[index])
  );
  if (unmatchedProductEntries.length !== 0) {
    return false;
  }
  return true;
};

const updateAndGetOrder = async (updatedOrder, thunkAPI) => {
  try {
    console.log("sending PUT request to update single order");
    console.log(updatedOrder);
    const putRequestResponse = await axios({
      method: "PUT",
      url: "/order",
      baseURL: process.env.backendServerBaseURI,
      data: updatedOrder,
    });
    // response.data is the ResponseWrapper entity from backend
    // ignore putRequestResponse as long as it's successful
    console.log("PUT request to update order sent successfully");
    console.log(putRequestResponse);

    const getRequestResponse = await axios({
      method: "GET",
      url: "/order",
      baseURL: process.env.backendServerBaseURI,
      params: {
        orderId: updatedOrder.orderId,
        pageIndex: 0,
        // there should only be one order
        pageSize: 1,
      },
    });
    console.log("GET request to get a single order sent successfully");
    console.log(getRequestResponse.data);

    // response.data is the ResponseWrapper entity from backend
    // response.data.data should contain an order
    return thunkAPI.fulfillWithValue(getRequestResponse.data);
  } catch (error) {
    console.log("GET or PUT request to update order failed");
    console.log(error.response.data);

    return thunkAPI.rejectWithValue(error.response.data);
  }
};
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (
    {
      prodctEntrySlice,
      commonFieldSlice,
      addedNewProductEntrySlice,
      deletedProductEntrySlice,
    },
    thunkAPI
  ) => {
    /* 
    { // defined when updating a single product entry
      prodctEntrySlice:{
         productEntry: {}, // the updated product entry
         index: 3 // index of the edited productEntry inside of the store
    }, 
    // defined when updating common fields of a order other than product entries
    commonFieldSlice :{
         order: {}
     },
     // defined when deleting an entire product entry
     deletedProductEntrySlice: {
      index: 3 // current index of the product entry we want to delete
     },
     // defined when adding a new product entry
     addedNewProductEntrySlice: {
      productEntry:{} // the added product entry
     }
    } 
    */

    //the logic for checking whether fields are updated or not are done here
    const orgOrder = thunkAPI.getState().order.order;
    if (prodctEntrySlice !== undefined) {
      if (
        !isEqualProductEntry(
          orgOrder.productEntries[prodctEntrySlice.index],
          prodctEntrySlice.productEntry
        )
      ) {
        const updatedProductEntries = [...orgOrder.productEntries];
        updatedProductEntries[prodctEntrySlice.index] =
          prodctEntrySlice.productEntry;
        const updatedOrder = {
          ...orgOrder,
          productEntries: updatedProductEntries,
        };
        return updateAndGetOrder(updatedOrder, thunkAPI);
      } else {
        return thunkAPI.fulfillWithValue({ noChange: true });
      }
    } else if (commonFieldSlice !== undefined) {
      const updatedOrder = {
        ...commonFieldSlice.order,
        productEntries: orgOrder.productEntries,
      };
      if (!isEqualOrder(orgOrder, updatedOrder)) {
        return updateAndGetOrder(updatedOrder, thunkAPI);
      } else {
        return thunkAPI.fulfillWithValue({ noChange: true });
      }
    } else if (addedNewProductEntrySlice !== undefined) {
      const updatedProductEntries = [
        ...orgOrder.productEntries,
        addedNewProductEntrySlice.productEntry,
      ];
      const updatedOrder = {
        ...orgOrder,
        productEntries: updatedProductEntries,
      };
      return updateAndGetOrder(updatedOrder, thunkAPI);
    } else if (deletedProductEntrySlice !== undefined) {
      if (deletedProductEntrySlice.index >= orgOrder.productEntries.length) {
        return thunkAPI.rejectWithValue(
          "index of deleting product entry is out of bound"
        );
      }
      const index = deletedProductEntrySlice.index;
      // don't use splice here, it mutates state and immer doesn't work well with it
      const updatedProductEntries = [
        ...orgOrder.productEntries.slice(0, index),
        ...orgOrder.productEntries.slice(index + 1),
      ];
      const updatedOrder = {
        ...orgOrder,
        productEntries: updatedProductEntries,
      };
      return updateAndGetOrder(updatedOrder, thunkAPI);
    } else {
      console.log("updateOrder thunk error");
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (requestParams, thunkAPI) => {
    const orgRequest = thunkAPI.getState().order.orderRequest;
    const newRequest =
      requestParams === undefined
        ? orgRequest
        : {
            ...orgRequest,
            params: requestParams,
          };

    console.log("request");
    console.log(newRequest);
    try {
      console.log("getOrders request sent, request:");
      console.log(newRequest);
      const getRequestResponse = await axios(newRequest);
      if (getRequestResponse.data.data.length <= 0) {
        console.log("empty result after getOrders");
        alert("沒有資料囉");
        return thunkAPI.fulfillWithValue({ noContent: true });
      }
      console.log("getOrders by pageIndex success. result: ");
      console.log(getRequestResponse.data);

      return thunkAPI.fulfillWithValue({
        orders: getRequestResponse.data.data,
        request: newRequest,
      });
    } catch (error) {
      console.log("getOrders failed");
      console.log(error.response.data);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
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
          productTicketId: "無資料",
        },
      ],
    },
  ],
  order: {
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
        productTicketId: "無資料",
      },
    ],
  },
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

  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
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
    // the (state, action) state here is already state.order
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    setOrder: (state, action) => {
      state.order = action.payload;
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
  // the (state, action) state here is already state.order
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.fulfilled, (state, action) => {
        if (action.payload.noChange === true) {
          console.log("No fields in this order is changed");
          return;
        }
        // thunkAPI.fulfilledWithValue('123') makes action.payload === '123'
        console.log("state.order set to following");
        console.log(action.payload.data[0]);

        state.status = "success";
        // action.payload is the ResponseWrapper returned from second argument of createAsycThunk
        state.order = action.payload.data[0];
      })
      .addCase(updateOrder.pending, (state, action) => {
        // note that the status and error field is global relative to the state structure!!!!!
        state.status = "loading";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        // because I used thunkAPI.rejectedWithValue("123")
        // the value I passed in ("123") gets passed to action.payload
        // if I return a promise in the thunk 2nd argument callback and it failed
        // the error will be in action.error
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.noContent === true) {
          console.log("Request success but no more data available");
          return;
        }
        console.log("state.orders set to following");
        console.log(action.payload.orders);

        state.orders = action.payload.orders;

        console.log("state.orderRequest set to following");
        console.log(action.payload.request);

        state.orderRequest = action.payload.request;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setOrders,
  clearOrders,
  setOrder,
  setOrderRequest,
  resetOrderRequestToDefault,
} = orderSlice.actions;

export default orderSlice.reducer;
