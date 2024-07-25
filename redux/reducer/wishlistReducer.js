import { getSingleProduct } from "../../services/products";
import {
  AddToWishList,
  GetAllWishListItems,
  RemoveItemFromWishList,
} from "../../services/wishlist";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  wishlist: [],
};



export const wishlistSlice = createSlice({
  name: "WishList",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.loading = true;
      let { product, user } = action.payload;
      console.log(product.user);


      let existingProduct = state.wishlist.find(
        (curItem) => curItem.id === product.product.id
      );
      console.log(existingProduct);
      if (existingProduct) {
        toast.warning("Product already is in wishlist");
      } else {

        const formData = {
          product_id: product.product.id,
          user_id: product.user,
        };
        const addItem = AddToWishList(formData);
        state.loading = true;
        toast.success(`${product.product.name} is added  in wishlist`);
        state.wishlist.push(product.product);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
       
      }
      state.loading = false;
    },
    removeFromWishList: (state, action) => {
      state.loading = false;
      let { id } = action.payload;
           console.log(id);
      const formData = {
        id: id,
      };

    const removeItem = RemoveItemFromWishList(formData);
    toast.success("Removed wishlist successfully");

      state.wishlist = state.filter((item) => {
        return item.id !== product.id;
      });

      state.loading = false;
    },
    setWishList: (state, action) => {
      state.wishlist = action.payload;

      // state.loading = true;
      // const id = action.payload; // this id is of the user
      // try {
      //   const getItems = GetAllWishListItems(id);
      //   getItems.map((productId) => {
      //     const product = getSingleProduct(productId);
      //     state.wishlist.push(product);
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
      state.loading = false;
    },
  },
});

export const { addToWishlist, removeFromWishList, setWishList } =
  wishlistSlice.actions;

export const WishListReducer = wishlistSlice.reducer;
