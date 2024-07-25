 import axios from "axios";
import { CartUrl,AddToCartUrl,RemoveCartUrl } from "../../config";
import POST from "../../axios/post";
import { toast } from "react-toastify";




export const AddToCart = async (formData) => { 
    POST(AddToCartUrl, formData)
    .then((response) => {
      return response;
    })

    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Error: " + error.response.data.message); // Display the error message from the response
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log("Error in Add product to cart (service) =>", error);
    });
 
};


export const RemoveItemFromCart = async (formData) => {
  // const formData = { productID, userID}
 
    POST(RemoveCartUrl, formData)
    .then((response) => {
      return response;
    })

    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Error: " + error.response.data.message); // Display the error message from the response
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log("Error in remove  product to cart (service) =>", error);
    });
 
};


export const GetAllCartItems = async (id) => {
  // id is user id
  try {
    const res = await axios(`${CartUrl}/get-cart-items?id=${id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(
      "Error in getting all cart Item for specific User (service) =>",
      error
    );
  }
};


// export const RemoveItemFromCart = async (formData) => {
//   try {
//     const res = await axios.post(RemoveCartUrl, formData, {
//       // headers: {
//       //   'Content-Type': 'application/json',
//       //   // Add other headers if necessary
//       // },
//     });

//     return res.data; // Axios automatically parses the response data to JSON
//   } catch (error) {
//     console.error("Error in deleting cart item (service) =>", error);
//     throw error; // Rethrow the error if you need to handle it elsewhere
//   }
// };
