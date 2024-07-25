import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CommonUrl } from "../../config";

const initialState = {
  loading: false,
  CommonDetails: [],
  dataFetched: false,
};

export const fetchCommonData = createAsyncThunk("fetchCommonData", async () => {
  const response = await fetch(CommonUrl);
  return response.json();
});

export const commonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    setCatItems: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCommonData.fulfilled, (state, action) => {
          console.log("reducer", action);
      state.loading = false;
      state.dataFetched = true;
      // Add any fetched data to the array
      state.CommonDetails = action.payload;
      let homeData = action.payload;
      // localStorage.setItem("homeData", homeData);
    });
  },
});

export const { CommonDetails, dataFetched } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
