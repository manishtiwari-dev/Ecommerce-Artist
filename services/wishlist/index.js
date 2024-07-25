// import axios from "axios";
import { wishListUrl,AddwishListUrl,RemovewishListUrl } from "../../config";
import POST from "../../axios/post";
import { toast } from "react-toastify";



export const AddToWishList = async (formData) => {
  // const formData = { productID, userID}
 
    POST(AddwishListUrl, formData)
    .then((response) => {
      console.log(response.data.message);
      toast.success(response.data.message);
      return response;
    })

    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Error: " + error.response.data.message); // Display the error message from the response
      } 
      console.log("Error in Add product to wishlist =>", error);
    });
 
};

export const GetAllWishListItems = async (id) => {
  // id is user id
  try {
    const res = await axios(`${wishListUrl}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(
      "Error in getting all wishlist Item for specific User =>",
      error
    );
  }
};


// export const RemoveItemFromWishList = async (formData) => {
//   // const formData = { productID, userID}
//   try {
//     const res = await axios(`${RemovewishListUrl}`, {
//       method: "DELETE",
//       data: formData,
//     });

//     return res.data;
//   } catch (error) {
//     console.log("Error in deleting wishlist item =>", error);
//   }
// };


export const RemoveItemFromWishList = async (formData) => {
  // const formData = { productID, userID}
 
    POST(RemovewishListUrl, formData)
    .then((response) => {
      toast.success(response.data.notification);
      return response;
    })

    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Error: " + error.response.data.message); // Display the error message from the response
      } 
      console.log("Error in remove  product to cart (service) =>", error);
    });
 
};
