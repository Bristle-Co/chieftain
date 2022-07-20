import { createSlice } from "@reduxjs/toolkit";

// must have a initial state else next.js will encounter html component mismatch
// see: https://stackoverflow.com/questions/47017424/warning-did-not-expect-server-html-to-contain-a-li-in-ul-in-react-redux-se
const initialState = {
  pageMetaData: {
    pageName: "",
  },
};

export const pageMetaDataSlice = createSlice({
  name: "pageMetaData",
  initialState,
  reducers: {
    setPageName: (state, action) => {
      state.pageMetaData.pageName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPageName } = pageMetaDataSlice.actions;

export default pageMetaDataSlice.reducer;
