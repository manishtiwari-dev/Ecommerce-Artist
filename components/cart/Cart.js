"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
  ImageBaseUrl,
  CartUrl,
  RemoveCartUrl,
  TitleSuffix,
} from "../../config";
import POST from "../../axios/post";
import Link from "next/link";

import Moment from "react-moment";
import {
  clearCart,
  setCartItems,
  setDiscountApplied,
  setTotalPrice,
  removeFromCart,
} from "../../redux/reducer/cartReducer";
import Loading from "../../helpers/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  // const { cart, total_price, discount, total_items } = useSelector(
  //   (state) => state.Cart
  // );

  const { user } = useSelector((state) => state.User);
  const userDetails = user
  console.log("userDetails", userDetails);

  const cartData = useSelector(state => state.Cart)
  console.log('cartData', cartData);

  const [cart, setCart] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [totalCart, setTotalCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const getData = async () => {
    if (!userDetails) return;
    setLoading(true);
    const filterData = {
      user_id: userDetails.id,
    };

    POST(CartUrl, filterData)
      .then((response) => {
        console.log('cart response', response);
        if (response.status === 200) {
          setCart(response.data.cartProducts);
          dispatch(setCartItems(response.data.cartProducts))
          setTotalCart(response.data.total_cart);
          setTotalPrice(response.data.total_price);
        } else toast.error("Error Fectch Failed Data");
        setLoading(false)
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(false, error.message);
        setLoading(false)
      });
  };

  const title = `All Cart ${TitleSuffix}`;

  useEffect(() => {
    document.title = title;
    getData();
  }, [title]);

  console.log("cart", cart);

  const getImageExtension = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 1];
  };

  const RemoveItemFromCart = async (id, user_id, product_id) => {
    const formData = { id, user_id, product_id };

    // POST(RemoveCartUrl, formData)
    //   .then((response) => {
    //     console.log("response", response)
    //     return response;
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       toast.error("Error: " + error.response.data.message); // Display the error message from the response
    //     } else {
    //       toast.error("An unexpected error occurred");
    //     }
    //     console.log("Error in remove  product to cart (service) =>", error);
    //   });
    dispatch(removeFromCart(formData))
    let rest = cart.filter((item) => {
      return item.product.id !== product_id;
    });
    setCart(rest)
    // console.log('rest', rest);
    // getData();
  };

  return (
    <>
      <div className="cart-wrapper spaceingtop">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <div className="heading">
                <h3>Cart</h3>
              </div>
            </div>
            <div className="col-md-3">
              {/* <button type="button" className="btn btn-link AddBtn">
                Item Added: <span>{totalCart}</span>
              </button> */}
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row">
              <div className="inner-cart">
                {cart && cart.length > 0 ? (
                  cart.map((item) => {
                    return (
                      <>
                        <div className="boxes">
                          <div className="col-md-9 col-left">
                            <div className="image">
                              <img
                                src={
                                  item.product.thumb_image
                                    ? `${ImageBaseUrl}products/${item.product.id
                                    }/${item.product.slug
                                    }-300.${getImageExtension(
                                      item.product.thumb_image
                                    )}`
                                    : "/img/no-image1.png"
                                }
                                alt={item.product.name}
                              />
                            </div>
                            <div className="content">
                              <h4>{item.product.name}</h4>
                              <h6>By Artist Name</h6>
                              <hr />
                              <div className="list">
                                <ul>
                                  <li>
                                    <span>Size :</span> 40 X 80 in
                                  </li>
                                  <li>
                                    <span>Medium :</span> Paint on Paper
                                  </li>
                                  <li>
                                    <span>Created in:</span>{" "}
                                    <Moment format="YYYY">
                                      {item.created_at}
                                    </Moment>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3 col-right">
                            <p className="price">₹{item.product.price}</p>
                            <div className="cart-icons">
                              <ul>
                                <li>
                                  <span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        RemoveItemFromCart(
                                          item.id,
                                          userDetails && userDetails.id,
                                          item.product.id,
                                        )
                                      }
                                      style={{
                                        border: "none",
                                        background: "none",
                                        padding: 0,
                                        cursor: "pointer",
                                      }}
                                      aria-label="Remove item from cart"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                      >
                                        <path
                                          d="M8.625 4.5H12.375C12.375 4.00272 12.1775 3.52581 11.8258 3.17417C11.4742 2.82254 10.9973 2.625 10.5 2.625C10.0027 2.625 9.52581 2.82254 9.17417 3.17417C8.82254 3.52581 8.625 4.00272 8.625 4.5ZM7.5 4.5C7.5 3.70435 7.81607 2.94129 8.37868 2.37868C8.94129 1.81607 9.70435 1.5 10.5 1.5C11.2956 1.5 12.0587 1.81607 12.6213 2.37868C13.1839 2.94129 13.5 3.70435 13.5 4.5H18.1875C18.3367 4.5 18.4798 4.55926 18.5852 4.66475C18.6907 4.77024 18.75 4.91332 18.75 5.0625C18.75 5.21168 18.6907 5.35476 18.5852 5.46025C18.4798 5.56574 18.3367 5.625 18.1875 5.625H17.205L16.2922 16.5773C16.2258 17.374 15.8624 18.1167 15.2741 18.6581C14.6858 19.1994 13.9155 19.4999 13.116 19.5H7.884C7.08449 19.4999 6.3142 19.1994 5.72588 18.6581C5.13755 18.1167 4.77416 17.374 4.70775 16.5773L3.795 5.625H2.8125C2.66332 5.625 2.52024 5.56574 2.41475 5.46025C2.30926 5.35476 2.25 5.21168 2.25 5.0625C2.25 4.91332 2.30926 4.77024 2.41475 4.66475C2.52024 4.55926 2.66332 4.5 2.8125 4.5H7.5ZM5.829 16.4835C5.87189 16.9991 6.10697 17.4797 6.48761 17.83C6.86825 18.1804 7.36666 18.3749 7.884 18.375H13.116C13.6333 18.3749 14.1317 18.1804 14.5124 17.83C14.893 17.4797 15.1281 16.9991 15.171 16.4835L16.077 5.625H4.92375L5.829 16.4835ZM8.8125 8.25C8.96168 8.25 9.10476 8.30926 9.21025 8.41475C9.31574 8.52024 9.375 8.66332 9.375 8.8125V15.1875C9.375 15.3367 9.31574 15.4798 9.21025 15.5852C9.10476 15.6907 8.96168 15.75 8.8125 15.75C8.66332 15.75 8.52024 15.6907 8.41475 15.5852C8.30926 15.4798 8.25 15.3367 8.25 15.1875V8.8125C8.25 8.66332 8.30926 8.52024 8.41475 8.41475C8.52024 8.30926 8.66332 8.25 8.8125 8.25ZM12.75 8.8125C12.75 8.66332 12.6907 8.52024 12.5852 8.41475C12.4798 8.30926 12.3367 8.25 12.1875 8.25C12.0383 8.25 11.8952 8.30926 11.7898 8.41475C11.6843 8.52024 11.625 8.66332 11.625 8.8125V15.1875C11.625 15.3367 11.6843 15.4798 11.7898 15.5852C11.8952 15.6907 12.0383 15.75 12.1875 15.75C12.3367 15.75 12.4798 15.6907 12.5852 15.5852C12.6907 15.4798 12.75 15.3367 12.75 15.1875V8.8125Z"
                                          fill="#FF0000"
                                        />
                                      </svg>
                                    </button>
                                  </span>
                                </li>
                                <li>
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M14.1126 14.1683C12.2585 15.792 10.3621 16.847 10.103 16.9869C9.8439 16.847 7.94748 15.792 6.09342 14.1683C4.13772 12.4556 2.40702 10.2643 2.40684 7.9604C2.40812 6.90774 2.82685 5.89856 3.5712 5.15421C4.31555 4.40986 5.32474 3.99113 6.3774 3.98984C7.72611 3.98995 8.87466 4.56672 9.5832 5.51039L10.103 6.20267L10.6228 5.51039C11.3313 4.56672 12.4799 3.98995 13.8286 3.98984C14.8812 3.99113 15.8904 4.40986 16.6348 5.15421C17.3792 5.89865 17.798 6.90798 17.7991 7.96077C17.7988 10.2645 16.0682 12.4556 14.1126 14.1683Z"
                                        stroke="#6A5B9C"
                                        stroke-width="1.3"
                                      />
                                    </svg>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <h4>No Products in the cart..</h4>
                )}
                {/* <div className="boxes">
                <div className="col-md-9 col-left">
                    <div className="image">
                        <img src="images/cart-item2.png" alt="">
                    </div>
                    <div className="content">
                        <h4>Majestic Deer</h4>
                        <h6>By Artist Name</h6>
                        <hr>
                    
                    <div className="list">
                        <ul>
                            <li><span>Size :</span> 303 X 202 in</li>
                            <li><span>Medium :</span> Paint on Paper</li>
                            <li><span>Created in:</span> 2023</li>
                        </ul>
                    </div>
                   
                </div>
                 </div>
                
                 <div className="col-md-3 col-right">
                    <p className="price">₹51,000</p>
                    <div className="cart-icons">
                       <ul>
                        <li>
                         <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M8.625 4.5H12.375C12.375 4.00272 12.1775 3.52581 11.8258 3.17417C11.4742 2.82254 10.9973 2.625 10.5 2.625C10.0027 2.625 9.52581 2.82254 9.17417 3.17417C8.82254 3.52581 8.625 4.00272 8.625 4.5ZM7.5 4.5C7.5 3.70435 7.81607 2.94129 8.37868 2.37868C8.94129 1.81607 9.70435 1.5 10.5 1.5C11.2956 1.5 12.0587 1.81607 12.6213 2.37868C13.1839 2.94129 13.5 3.70435 13.5 4.5H18.1875C18.3367 4.5 18.4798 4.55926 18.5852 4.66475C18.6907 4.77024 18.75 4.91332 18.75 5.0625C18.75 5.21168 18.6907 5.35476 18.5852 5.46025C18.4798 5.56574 18.3367 5.625 18.1875 5.625H17.205L16.2922 16.5773C16.2258 17.374 15.8624 18.1167 15.2741 18.6581C14.6858 19.1994 13.9155 19.4999 13.116 19.5H7.884C7.08449 19.4999 6.3142 19.1994 5.72588 18.6581C5.13755 18.1167 4.77416 17.374 4.70775 16.5773L3.795 5.625H2.8125C2.66332 5.625 2.52024 5.56574 2.41475 5.46025C2.30926 5.35476 2.25 5.21168 2.25 5.0625C2.25 4.91332 2.30926 4.77024 2.41475 4.66475C2.52024 4.55926 2.66332 4.5 2.8125 4.5H7.5ZM5.829 16.4835C5.87189 16.9991 6.10697 17.4797 6.48761 17.83C6.86825 18.1804 7.36666 18.3749 7.884 18.375H13.116C13.6333 18.3749 14.1317 18.1804 14.5124 17.83C14.893 17.4797 15.1281 16.9991 15.171 16.4835L16.077 5.625H4.92375L5.829 16.4835ZM8.8125 8.25C8.96168 8.25 9.10476 8.30926 9.21025 8.41475C9.31574 8.52024 9.375 8.66332 9.375 8.8125V15.1875C9.375 15.3367 9.31574 15.4798 9.21025 15.5852C9.10476 15.6907 8.96168 15.75 8.8125 15.75C8.66332 15.75 8.52024 15.6907 8.41475 15.5852C8.30926 15.4798 8.25 15.3367 8.25 15.1875V8.8125C8.25 8.66332 8.30926 8.52024 8.41475 8.41475C8.52024 8.30926 8.66332 8.25 8.8125 8.25ZM12.75 8.8125C12.75 8.66332 12.6907 8.52024 12.5852 8.41475C12.4798 8.30926 12.3367 8.25 12.1875 8.25C12.0383 8.25 11.8952 8.30926 11.7898 8.41475C11.6843 8.52024 11.625 8.66332 11.625 8.8125V15.1875C11.625 15.3367 11.6843 15.4798 11.7898 15.5852C11.8952 15.6907 12.0383 15.75 12.1875 15.75C12.3367 15.75 12.4798 15.6907 12.5852 15.5852C12.6907 15.4798 12.75 15.3367 12.75 15.1875V8.8125Z" fill="#FF0000"/>
                                </svg>
                         </span>
                        </li>
                            <li>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.1126 14.1683C12.2585 15.792 10.3621 16.847 10.103 16.9869C9.8439 16.847 7.94748 15.792 6.09342 14.1683C4.13772 12.4556 2.40702 10.2643 2.40684 7.9604C2.40812 6.90774 2.82685 5.89856 3.5712 5.15421C4.31555 4.40986 5.32474 3.99113 6.3774 3.98984C7.72611 3.98995 8.87466 4.56672 9.5832 5.51039L10.103 6.20267L10.6228 5.51039C11.3313 4.56672 12.4799 3.98995 13.8286 3.98984C14.8812 3.99113 15.8904 4.40986 16.6348 5.15421C17.3792 5.89865 17.798 6.90798 17.7991 7.96077C17.7988 10.2645 16.0682 12.4556 14.1126 14.1683Z" stroke="#6A5B9C" stroke-width="1.3"/>
                                        </svg>
                                </span>
                            </li>
                       </ul>
                    </div>
                    
                </div>
            </div>
             */}
              </div>

              {cart && cart.length > 0 && (<>
                <div className="total-amount-wrapper">
                  <h4>
                    Sub Total <span>{totalCart} items</span>
                  </h4>
                  <span>{totalPrice && totalPrice}</span>
                </div>

                <Link href="/checkout">
                  <button type="button" className="btn btn-link checkoutBtn">
                    Continue to checkout
                  </button>
                </Link>
              </>)}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Cart;
