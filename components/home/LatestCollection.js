"use client";
import React, { useState, useEffect } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl, ProductHomeImageUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import SkeletonLatestCollections from "../../helpers/SkeletonLatestCollections";
import LoginPopup from "../LoginPopup";
import {
  addToWishlist,
  setWishList,
  removeFromWishList,
} from "../../redux/reducer/wishlistReducer";
import { Modal } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const LatestCollection = () => {
  const dispatch = useDispatch();

  //home reducer
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const latestProducts = homePageData.latestProducts;

  //user reducer
  const { user } = useSelector((state) => state.User);
  const userDetails = user 

  //wishlist reducer
  const { wishlist } = useSelector((state) => state.WishList);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
    if (userDetails && userDetails.id) {
      // dispatch(setWishList(userDetails.id));
      // dispatch(setWishList());
    }
  }, [dispatch, dataFetched, user, wishlist]);

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const handleAddToWishlist = (product, user) => {
    if (user) {
      setShow(false);
      console.log(product.user);
      dispatch(addToWishlist({ product, user }));
      return;
    } else {
      setShow(true);
    }
  };

  const getImageExtension = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 1];
  };

  // console.log("latestProducts", latestProducts);

  return (
    <>
      {latestProducts ? (
        <section className="Latest-collections desktop-lastest-collections">
          <div className="container-fluid">
            <h3>Latest Collections</h3>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
            >
              <Masonry>
                {latestProducts && latestProducts.length > 0 ? (
                  latestProducts.map((item, index) => (
                    <div key={index} className="column">
                      <div className="imasonry-items">
                        <Link href={`/product/${item.slug}`}>
                          <div className="image">
                            <img
                              src={
                                item.thumb_image
                                  ? `${ImageBaseUrl}products/${item.id}/${item.slug}-300.${getImageExtension(item.thumb_image)}`
                                  : "/img/no-image1.png"
                              }
                              alt={item.name}
                            />
                          </div>
                        </Link>
                        <div className="content">
                          <Link href={`/product/${item.slug}`}>
                            <div className="col-left">
                              <h5>
                                {item.short_description.length > 50
                                  ? `${item.short_description.slice(0, 50)}...`
                                  : item.short_description}
                              </h5>
                              <span>{item.name}</span>
                              <h6>70X20 In</h6>
                            </div>
                          </Link>
                          <div className="col-right">
                            <div
                              className="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                item.wishlist
                                  ? dispatch(
                                      removeFromWishList({ id: item.wishlist.id })
                                    )
                                  : handleAddToWishlist({
                                      product: item,
                                      user: userDetails && userDetails.id,
                                    });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill={item && item.wishlist ? "fill" : "none"}
                              >
                                <path
                                  d="M14.1121 14.1683C12.258 15.792 10.3616 16.847 10.1025 16.987C9.84341 16.847 7.94699 15.792 6.09293 14.1683C4.13723 12.4556 2.40653 10.2643 2.40635 7.96042C2.40763 6.90777 2.82637 5.89858 3.57072 5.15423C4.31506 4.40988 5.32425 3.99115 6.37691 3.98987C7.72562 3.98997 8.87417 4.56674 9.58271 5.51041L10.1025 6.2027L10.6223 5.51041C11.3308 4.56674 12.4794 3.98997 13.8281 3.98987C14.8808 3.99115 15.8899 4.40988 16.6343 5.15423C17.3787 5.89867 17.7975 6.908 17.7987 7.96079C17.7983 10.2645 16.0677 12.4557 14.1121 14.1683Z"
                                  stroke="#6A5B9C"
                                  stroke-width="1.3"
                                ></path>
                              </svg>
                            </div>
                            <span className="price">₹{item.price}</span>
                          </div>
                        </div>
                        <Link href={`/product/${item.slug}`}>
                          <button type="button" className="btn btn-link viewBtn">
                            View
                          </button>
                        </Link>
                        <button type="button" className="btn btn-link addBtn">
                          Add to cart
                        </button>

                        {index < 3 && <hr />}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <Modal show={show} onHide={handleModalClose}>
            <Modal.Body>
              <LoginPopup handleModalClose={handleModalClose} />
            </Modal.Body>
          </Modal>
        </section>
      ) : (
        <SkeletonLatestCollections />
      )}
   



  
      {/* mobile latest collections */}
      {latestProducts ? (
        <section className="Latest-collections mobile-lastest-collections">
          <div className="container-fluid">
            <div className="row">
              <h3>Latest Collections</h3>
              {latestProducts && latestProducts.length > 0 ? (
                latestProducts.map((item, index) => (
                  <div className="column">
                    <Link href={`/product/${item.slug}`}>
                      <div className="imasonry-items">
                        <div className="image">
                          <img
                            src={
                              item.thumb_image
                                ? `${ImageBaseUrl}products/${item.id}/${
                                    item.slug
                                  }-300.${getImageExtension(item.thumb_image)}`
                                : "/img/no-image1.png"
                            }
                            alt={item.name}
                          />
                        </div>
                        <div className="content">
                          <div className="col-left">
                            <h5>
                              {item.short_description.length > 50
                                ? `${item.short_description.slice(0, 50)}...`
                                : item.short_description}
                            </h5>
                            <span>{item.name}</span>
                            <h6>70X20 In</h6>
                          </div>
                          <div className="col-right">
                            <div className="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M14.1121 14.1683C12.258 15.792 10.3616 16.847 10.1025 16.987C9.84341 16.847 7.94699 15.792 6.09293 14.1683C4.13723 12.4556 2.40653 10.2643 2.40635 7.96042C2.40763 6.90777 2.82637 5.89858 3.57072 5.15423C4.31506 4.40988 5.32425 3.99115 6.37691 3.98987C7.72562 3.98997 8.87417 4.56674 9.58271 5.51041L10.1025 6.2027L10.6223 5.51041C11.3308 4.56674 12.4794 3.98997 13.8281 3.98987C14.8808 3.99115 15.8899 4.40988 16.6343 5.15423C17.3787 5.89867 17.7975 6.908 17.7987 7.96079C17.7983 10.2645 16.0677 12.4557 14.1121 14.1683Z"
                                  stroke="#6A5B9C"
                                  stroke-width="1.3"
                                ></path>
                              </svg>
                            </div>
                            <span className="price">₹{item.price}</span>
                          </div>
                        </div>
                        <button type="button" className="btn btn-link viewBtn">
                          View
                        </button>
                        <button type="button" className="btn btn-link addBtn">
                          Add to cart
                        </button>
                        <hr />
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
              {/* <div className="btn-viewAll">
              <button type="button" className="btn btn-link artBtn">
                View All
              </button>
            </div> */}
            </div>
          </div>
        </section>
      ) : (
        <SkeletonLatestCollections />
      )}




      
    </> 
  );
};
export default LatestCollection;
