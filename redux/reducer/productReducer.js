import { getAllProducts, getSingleProduct } from "../../services/products";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  filteredProducts: [],
  singleProduct: {},
  wishlist: [],
  sortingValue: "",
  filterValue: {
    text: "",
    category: [],
    artist: [],
    size: [],
    orientation: [],
    color: [],
    subject: [],
    medium: [],
    priceRange: [],
  },
};

export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.loading = true;
      // const allProducts = getAllProducts();
      const { products, fromHeader } = action.payload;
      state.products = products;
      if (fromHeader === false) {
        state.filteredProducts = products;
      }
      // localStorage.setItem("filteredProducts", JSON.stringify(products));
      state.loading = false;
    },
    setSingleProduct: (state, action) => {
      state.loading = true;
      const productId = action.payload;
      const singleProduct = state.products.find((item) => {
        return item.id === parseInt(productId);
      });

      state.singleProduct = singleProduct;
      state.loading = false;
    },
    setSortingValue: (state, action) => {
      state.sortingValue = action.payload;
    },
    SortedProducts: (state, action) => {
      state.loading = true;
      let tempSortProduct = state.filteredProducts;
      const sorting_value = state.sortingValue;
      const sortingProducts = (a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));

        if (sorting_value === "lowest") {
          return priceA - priceB;
        }

        if (sorting_value === "highest") {
          return priceB - priceA;
        }

        if (sorting_value === "a-z") {
          return a.title.localeCompare(b.title);
        }

        if (sorting_value === "z-a") {
          return b.title.localeCompare(a.title);
        }
      };

      let sortedData = tempSortProduct.sort(sortingProducts);
      state.filteredProducts = sortedData;
      // localStorage.setItem("filteredProducts", JSON.stringify(sortedData));
      state.loading = false;
    },
    setFilterValue: (state, action) => {
      const { name, value } = action.payload;
      state.filterValue = {
        ...state.filterValue,
        [name]: value,
      };
    },
    FilterProducts: (state, action) => {
      state.loading = true;
      let tempFilterProduct = state.products;

      const {
        text,
        category,
        artist,
        size,
        orientation,
        color,
        subject,
        medium,
        priceRange,
      } = state.filterValue;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.title.toLowerCase().includes(text);
        });
      }

      if (category && category.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return category.includes(curElem.category);
        });
      }

      if (artist && artist.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return artist.includes(curElem.artist);
        });
      }

      if (size && size.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.size.some((elem) => size.includes(elem));
        });
      }

      if (orientation && orientation.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.orientation.some((elem) => orientation.includes(elem));
        });
      }

      if (color && color.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return color.includes(curElem.color);
        });
      }

      if (subject && subject.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return subject.includes(curElem.subject);
        });
      }

      if (medium && medium.length > 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return medium.includes(curElem.medium);
        });
      }

      if (priceRange && priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange.map((price) => {
          if (typeof price === "string") {
            return parseFloat(price.replace("$", ""));
          }
          return price;
        });

        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          const price =
            typeof curElem.price === "string"
              ? parseFloat(curElem.price.replace("$", ""))
              : curElem.price;
          return price >= minPrice && price <= maxPrice;
        });
      }

      if (state.sortingValue) {
        const sortingProducts = (a, b) => {
          const priceA = parseFloat(a.price.replace("$", ""));
          const priceB = parseFloat(b.price.replace("$", ""));

          if (state.sortingValue === "lowest") {
            return priceA - priceB;
          }

          if (state.sortingValue === "highest") {
            return priceB - priceA;
          }

          if (state.sortingValue === "a-z") {
            return a.title.localeCompare(b.title);
          }

          if (state.sortingValue === "z-a") {
            return b.title.localeCompare(a.title);
          }
        };

        let sortedData = tempFilterProduct.sort(sortingProducts);
        state.filteredProducts = sortedData;
      } else {
        state.filteredProducts = tempFilterProduct;
      }
      // localStorage.setItem("filteredProducts", JSON.stringify(tempFilterProduct));
      state.loading = false;
    },
    clearFilters: (state, action) => {
      state.filteredProducts = state.products;
      // localStorage.setItem("filteredProducts", JSON.stringify(state.products))
      state.filterValue = {
        text: "",
        category: [],
        artist: [],
        size: [],
        orientation: [],
        color: [],
        subject: [],
        medium: [],
        priceRange: [],
      };
    },
  },
});

export const {
  setProducts,
  setSingleProduct,
  setSortingValue,
  SortedProducts,
  setFilterValue,
  FilterProducts,
  clearFilters,
} = productSlice.actions;

export const ProductReducer = productSlice.reducer;
