
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  AddToCart,
  GetAllCartItems,
  RemoveItemFromCart,
} from "../../services/cart";
const initialState = {
  loading: false,
  cartData: [],
  discount: 0,
  total_items: [],
  total_price: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};


export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.loading = true;
      let { product, user, coupon_price } = action.payload;
      console.log(product.coupon_price);
      let existingProduct = state.cartData.filter(
        (curItem) => curItem.product.id === product.product.id
      );

      // toast.success(`${product.name} is added to cart`);
      if (existingProduct.length === 0) {
        const formData = {
          product_id: product.product.id,
          user_id: product.user,
          coupon_price: product.coupon_price
        };
        const addItem = AddToCart(formData);

        toast.success(`${product.product.name} is added to cart`);
        state.cartData.push(product);
        localStorage.setItem("cartData", JSON.stringify(state.cartData));
      } else {
        toast.warning(`${product.product.name} is already in cart`);
      }
      state.loading = false;
    },
    removeFromCart: (state, action) => {
      state.loading = true;
      let { id, user_id, product_id } = action.payload;
      console.log('action', action.payload);

      const removeItem = RemoveItemFromCart({ id, user_id });

      state.cartData = state.cartData.filter((item) => {
        return item.product.id !== product_id;
      });

      toast.success(`Item is removed from cart`);
      localStorage.setItem("cartData", JSON.stringify(state.cartData));

      state.loading = false;
    },
    setCartItems: (state, action) => {
      state.cartData = action.payload;
    },
    setTotalItems: (state, action) => {
      state.total_items = state.cartData.length;
    },
    setTotalPrice: (state, action) => {
      const totalPrice = state.cartData.reduce((total, item) => {
        if (item.price && typeof item.price === 'string') {
          const price = parseFloat(item.price.replace("$", ""));
          return total + (isNaN(price) ? 0 : price);
        }
        return total;
      }, 0);

      state.total_price = parseFloat(totalPrice.toFixed(2));
    },
    setDiscountApplied: (state, action) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    clearCart: (state, action) => {
      // state.cart = [];
      state.cartData = [];
      state.total_items = 0;
      state.total_price = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartItems,
  setTotalItems,
  setTotalPrice,
  setDiscountApplied,
  saveShippingInfo,
  clearCart,
} = cartSlice.actions;

export const CartReducer = cartSlice.reducer;
