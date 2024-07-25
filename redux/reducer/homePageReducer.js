import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { HomeUrl } from "../../config";

const initialState = {
  loading: false,
  homePageData: [],
  dataFetched: false,
};

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const response = await fetch(HomeUrl);
  return response.json();
});

export const homeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    setCatItems: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      //   console.log("reducer", action);
      state.loading = false;
      state.dataFetched = true;
      // Add any fetched data to the array
      state.homePageData = action.payload;
      let homeData = action.payload;
      localStorage.setItem("homeData", homeData);
    });
  },
});

export const { homePageData, dataFetched } = homeSlice.actions;
export const homePageReducer = homeSlice.reducer;
