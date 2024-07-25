import { ProductDetailsUrl } from "../../config";

import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios(`${ProductDetailsUrl}/get-all-products`, {
      method: "GET",
    });
    return res.data;
  } catch (error) {
    console.log("Error in getting all products  =>", error);
  }
};

export const getAllProductsByCategory = async (categoryId) => {
  try {
    const res = await axios(
      `${ProductDetailsUrl}/get-product-by-category?id=${categoryId}`,
      {
        method: "GET",
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error in getting product by category (service) =>", error);
  }
};

export const getAllProductsByArtist = async (artistId) => {
  try {
    const res = await axios(
      `${ProductDetailsUrl}/get-product-by-artist?id=${artistId}`,
      {
        method: "GET",
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error in getting product by artist (service) =>", error);
  }
};

export const getAllProductsByCategoryAndArtist = async (
  categoryId,
  artistId
) => {
  try {
    const res = await axios(
      `${ProductDetailsUrl}/get-product-by-category-and-artist?category=${categoryId}&artist=${artistId}`,
      {
        method: "GET",
      }
    );
    return res.data;
  } catch (error) {
    console.log(
      "Error in getting product by category and artist (service) =>",
      error
    );
  }
};

export const getSingleProduct = async (productId) => {
  try {
    const res = await axios(
      `${ProductDetailsUrl}/get-single-product?id=${productId}`,
      {
        method: "GET",
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error in getting single product details (service) =>", error);
  }
};




export const fetchProductSlugs = async () => {
  try {
    const res = await fetch(
      `https://lab2.invoidea.in/rayart/public/api/product`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    const productSlugs = data.map(product => product.slug);

    return productSlugs;
  } catch (e) {
    console.log(e);
  }
};



export const productBySlug = async (slug) => {
  try {
    const res = await fetch(
      `https://lab2.invoidea.in/rayart/public/api/product?slug=${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};