import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const isEqualProductionTicket = (org, updated) => {
  return true;
};

export const updateProductionTicket = createAsyncThunk(
  "productionTicket/updateProductionTicket",
  async (updatedProductionTicket, thunkAPI) => {
    //the logic for checking whether fields are updated or not are done here
    const orgProductionTicket =
      thunkAPI.getState().productionTicket.productionTicket;
    if (updatedProductionTicket === undefined) {
      console.log(
        "updateProdu thunk error, updatedProductionTicket is undefined"
      );
      thunkAPI.fulfillWithValue(
        "updateProdu thunk error, updatedProductionTicket is undefined"
      );
    }

    try {
      console.log("sending PUT request to update single production ticket");
      console.log(updateAndGetProductionTicket);
      const putRequestResponse = await axios({
        method: "PUT",
        url: "/production_ticket",
        baseURL: process.env.backendServerBaseURI,
        data: updatedProductionTicket,
      });
      // response.data is the ResponseWrapper entity from backend
      // ignore putRequestResponse as long as it's successful
      console.log("PUT request to update production ticket sent successfully");
      console.log(putRequestResponse);

      const getRequestResponse = await axios({
        method: "GET",
        url: "/production_ticket",
        baseURL: process.env.backendServerBaseURI,
        params: {
          productTicketId: updatedProductionTicket.productTicketId,
          pageIndex: 0,
          // there should only be one productionTicket
          pageSize: 1,
        },
      });
      console.log(
        "GET request to get a single production ticket sent successfully"
      );
      console.log(getRequestResponse.data);

      // response.data is the ResponseWrapper entity from backend
      // response.data.data should contain an productionTicket
      return thunkAPI.fulfillWithValue(getRequestResponse.data);
    } catch (error) {
      console.log("GET or PUT request to update production ticket failed");
      console.log(error.response.data);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductionTickets = createAsyncThunk(
  "productionTicket/getProductionTickets",
  async (requestParams, thunkAPI) => {
    const orgRequest = thunkAPI.getState().productionTicket.productionTickets;
    const newRequest =
      requestParams === undefined
        ? orgRequest
        : {
            ...orgRequest,
            params: requestParams,
          };

    try {
      console.log("getProductionTickets request sent, request:");
      console.log(newRequest);
      const getRequestResponse = await axios(newRequest);
      if (getRequestResponse.data.data.length <= 0) {
        console.log("empty result after getProductionTickets");
        alert("沒有資料囉");
        return thunkAPI.fulfillWithValue({ noContent: true });
      }
      console.log(getRequestResponse.data);

      return thunkAPI.fulfillWithValue({
        productionTickets: getRequestResponse.data.data,
        request: newRequest,
      });
    } catch (error) {
      console.log("getProductionTickets failed");
      console.log(error.response.data);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// must have a initial state else next.js will encounter html component mismatch
// see: https://stackoverflow.com/questions/47017424/warning-did-not-expect-server-html-to-contain-a-li-in-ul-in-react-redux-se
const initialState = {
  productionTickets: [
    {
      ticketId: 0,
      customerId: "無資料",
      dueDate: null,
      productName: "無資料",
      bristleType: "無資料",
      model: "無資料",
      innerTubeType: "無資料",
      bristleDiameter: 0,
      quantity: 0,
      alumTubeType: "無資料",
      alumRimType: "無資料",
      modelNote: "無資料",
      donePreparingAt: null,
      preparedBy: "無資料",
      doneTwiningAt: null,
      twinedBy: "無資料",
      doneTrimmingAt: null,
      trimmedBy: "無資料",
      donePackagingAt: null,
      packagedBy: "無資料",
      issuedAt: null,
      productionNote1: "無資料",
      productionNote2: "無資料",
      productionNote3: "無資料",
      productionNote4: "無資料",
      productionNote5: "無資料",
      productionNote6: "無資料",
    },
  ],
  productionTicket: {
    ticketId: 0,
    customerId: "無資料",
    dueDate: null,
    productName: "無資料",
    bristleType: "無資料",
    model: "無資料",
    innerTubeType: "無資料",
    bristleDiameter: 0,
    quantity: 0,
    alumTubeType: "無資料",
    alumRimType: "無資料",
    modelNote: "無資料",
    donePreparingAt: null,
    preparedBy: "無資料",
    doneTwiningAt: null,
    twinedBy: "無資料",
    doneTrimmingAt: null,
    trimmedBy: "無資料",
    donePackagingAt: null,
    packagedBy: "無資料",
    issuedAt: null,
    productionNote1: "無資料",
    productionNote2: "無資料",
    productionNote3: "無資料",
    productionNote4: "無資料",
    productionNote5: "無資料",
    productionNote6: "無資料",
  },
  // request is kept in cache so pagination parameters are not lost after navigating to different pages
  productionTicketRequest: {
    method: "GET",
    url: "/production_ticket",
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
//   ticketId:1,
//  customerId:"string",
//  bristleType:"string",
//  model:"string",
//  productName:"string",
//  dueDateFrom:"2002-03-30",
//  dueDateTo:"2022-03-30",
//  issuedAtFrom:"2002-03-30",
//  issuedAtTo:"2002-03-30",
//  pageIndex:3
//  pageSize:2
// }

export const productionTicketSlice = createSlice({
  name: "productionTicket",
  initialState,
  reducers: {
    // the (state, action) state here is already state.productionTicket
    setProductionTickets: (state, action) => {
      state.productionTickets = action.payload;
    },
    clearProductionTickets: (state) => {
      state.productionTickets = [];
    },
    setProductionTicket: (state, action) => {
      state.productionTicket = action.payload;
    },

    setProductionTicketRequest: (state, action) => {
      state.productionTicketRequest = action.payload;
    },
    resetProductionTicketRequestToDefault: (state) => {
      state.productionTicketRequest.params = {
        pageIndex: 0,
        pageSize: process.env.globalPageSize,
      };
    },
  },
  // the (state, action) state here is already state.productionTicket
  extraReducers: (builder) => {
    builder
      .addCase(updateProductionTicket.fulfilled, (state, action) => {
        if (action.payload.noChange === true) {
          console.log("No fields in this production ticket is changed");
          return;
        }
        // thunkAPI.fulfilledWithValue('123') makes action.payload === '123'
        console.log("state.productionTicket set to following");
        console.log(action.payload.data[0]);

        state.status = "success";
        // action.payload is the ResponseWrapper returned from second argument of createAsycThunk
        state.productionTicket = action.payload.data[0];
      })
      .addCase(updateProductionTicket.pending, (state, action) => {
        // note that the status and error field is global relative to the state structure!!!!!
        state.status = "loading";
      })
      .addCase(updateProductionTicket.rejected, (state, action) => {
        // because I used thunkAPI.rejectedWithValue("123")
        // the value I passed in ("123") gets passed to action.payload
        // if I return a promise in the thunk 2nd argument callback and it failed
        // the error will be in action.error
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProductionTickets.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.noContent === true) {
          console.log("Request success but no more data available");
          return;
        }
        console.log("state.productionTickets set to following");
        console.log(action.payload.productionTickets);

        state.productionTickets = action.payload.productionTickets;

        console.log("state.productionTicketRequest set to following");
        console.log(action.payload.request);

        state.productionTicketRequest = action.payload.request;
      })
      .addCase(getProductionTickets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProductionTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setProductionTickets,
  clearProductionTickets,
  setProductionTicket,
  setProductionTicketRequest,
  resetProductionTicketRequestToDefault,
} = productionTicketSlice.actions;

export default productionTicketSlice.reducer;
