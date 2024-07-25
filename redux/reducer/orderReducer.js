import { createSlice } from "@reduxjs/toolkit";
import {
  CreateNewOrder,
  GetAllOrdersOfUser,
  GetOrderDetails,
} from "../../services/orders";

const initialState = {
  loading: false,
  order: [],
  singleOrder: {},
};

export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      state.loading = true;
      const order = action.payload;
      const createOne = CreateNewOrder(order);
      state.order.push(order);
      state.loading = false;
    },
    setOrder: (state, action) => {
      state.loading = true;
      const id = action.payload; // this id is of the user
      try {
        const getOrders = GetAllOrdersOfUser(id);
        state.order = getOrders;
      } catch (e) {
        console.log(e);
      }
      state.loading = false;
    },
    setSingleOrder: (state, action) => {
      state.loading = true;
      const id = action.payload;
      const orderDetails = GetOrderDetails(id);
      state.singleOrder = orderDetails;
      state.loading = false;
    },
  },
});

export const { addNewOrder, setOrder, setSingleOrder } = OrderSlice.actions;

export const OrderReducer = OrderSlice.reducer;
