import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (typeof window !== "undefined" && localStorage.getItem("loginDetails")) || null,
};


export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      console.log("userreducer", action);
      state.user = action.payload;
      localStorage.setItem("loginDetails", action.payload);

    },
    logoutState: (state) => {
    
      state.user = "";
      state.isAuthenticated = false;      
      localStorage.removeItem("loginDetails");
      localStorage.clear();
    },
  },
});

export const { setUser ,setUserData,logoutState} = userSlice.actions;

export const UserReducer = userSlice.reducer


