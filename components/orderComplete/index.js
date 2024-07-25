"use client";
import React, { useEffect, useState } from "react";
import { ImageBaseUrl, SearchProductUrl, AllProductUrl,TitleSuffix } from "../../config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import axios from "axios";
import Link from "next/link";
import Loading from "../../helpers/Loader";
import SkeletonProductLoader from "../../helpers/SkeletonProductLoader";
import POST from "../../axios/post";
import { useSearchParams } from 'next/navigation'

import LoginPopup from "../LoginPopup";
import { Modal } from "react-bootstrap";
import Pagination from "../pagination/index";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  setWishList,
  removeFromWishList
} from "../../redux/reducer/wishlistReducer";

const index = (price) => {
  const searchParams = useSearchParams();
  const orderID = searchParams.get('orderID');
  const dispatch = useDispatch();

 console.log(orderID);
   //user reducer
 const { user } = useSelector((state) => state.User);
 const userDetails = user && JSON.parse(user);

  //wishlist reducer
  const { wishlist } = useSelector(
   (state) => state.WishList
 );

 useEffect(() => {
 }, [dispatch, user,wishlist]);




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const [data, setData] = useState(null);





//   const getData =  async (pagev, ) => {
//     if (!minPriceValue && !maxPriceValue) return;
//     setLoading(true);
//     const filterData = {
//       page: pagev,
//       per_page: perPageItem,
//       minPrice: minPriceValue,
//       maxPrice: maxPriceValue,
//     };

//     POST(AllProductUrl, filterData)
//       .then((response) => {
//         console.log(response);
//         if (response.status === 200) {
//         const data= response.data;  
//         setPriceData(data.products.data);
//         SetPagi(data.products.total);
//         SetcurrPage(data.products.current_page);
//         SetPerPageItem(data.products.per_page);
//         setspecifications(data.specifications);
//         setartist(data.artist);
//         setCatData(data.categories);

//         } else 
//         toast.error("Error Fectch Failed Data");
//       })
//       .catch((error) => {
//         console.error("There was an error!", error);
//         toast.error(false,error.message);
//       });
//   };

 
//   const title = `Products${TitleSuffix}`;

//   useEffect(() => {
//     document.title = title;
 

//     getData(1, perPageItem);
//   }, [minPriceValue, maxPriceValue,title]);





 
  

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [formloadingStatus, SetformloadingStatus] = useState(false);

  const onSubmit= async (formData) => {
    SetformloadingStatus(false);
    const saveFormData = formData;
    saveFormData.per_page = perPageItem;
    saveFormData.min_price = minPriceValue;
    saveFormData.max_price = maxPriceValue;

    POST(SearchProductUrl, saveFormData)
      .then((response) => {
        SetformloadingStatus(false);
        const { status, message } = response.data;
        if (response.status === 200) {
        
          const data = response.data;
          setPriceData(data.products.data); // Update the state with the fetched data          
          SetPagi(data.products.total);
          SetcurrPage(data.products.current_page);
          SetPerPageItem(data.products.per_page);

         } else {
           // Handle errors, e.g., show an error message
           toast.error("Error failed");
         }

      })
      .catch((error) => {
        SetformloadingStatus(false);
        toast.error("Error submitting form");
      });
  };
  



  return (
   
    <div className="section listing">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          {/* <h1>Order Completed Page</h1> */}
        </div>

        <div className="col-md-9">
        <h1>Order Completed Page</h1>
        </div>
      </div>
    </div>
  </div>



  );
};
export default index;
