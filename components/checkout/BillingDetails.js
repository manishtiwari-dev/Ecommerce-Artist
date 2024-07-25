"use client";
import React, { useEffect, useState } from "react";
import CheckoutProductTable from "./CheckoutProductTable";
import { useDispatch, useSelector } from "react-redux";
import POST from "../../axios/post";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  ImageBaseUrl,
  CheckOutUrl,
  CheckOutPayWithBankUrl,
  TitleSuffix,
  OrderCreateUrl,
  AddressStoreUrl,
} from "../../config";
import axios from "axios";
import Script from "next/script";
import { ErrorMessage } from "@hookform/error-message";

const BillingDetails = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.User);
  const userDetails = user
  console.log("userDetails", userDetails);

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   companyName: "",
  //   address: "",
  //   city: "",
  //   country: "",
  //   postcode: "",
  //   mobile: "",
  //   email: "",
  //   orderNotes: "",
  // });

  const {
    register,
    handleSubmit,
    form,
    resetField,
    formState: { errors },
  } = useForm();

  const [formloadingStatus, SetformloadingStatus] = useState(false);
  // const [formData, setFormData]  = useState();
  const onSubmit = async (formData) => {
    SetformloadingStatus(false);
    const saveFormData = formData;
    saveFormData.user_id = userDetails.id;

    POST(AddressStoreUrl, saveFormData)
      .then((response) => {
        SetformloadingStatus(false);
        const { status, message } = response.data;
        if (response.status === 200) {
          const data = response.data;
          toast.success(response.data.message);
          // setData(data.products.data); // Update the state with the fetched data
          console.log(data.products);
        } else {
          // Handle errors, e.g., show an error message
          toast.error("Error ");
        }
      })
      .catch((error) => {
        SetformloadingStatus(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error("Error: " + error.response.data.message); // Display the error message from the response
        }
      });
  };



  const onBankSubmit = async (formData1) => {
    // SetformloadingStatus(false);
    const saveFormData = formData1;
    saveFormData.user_id = userDetails.id;

    POST(CheckOutPayWithBankUrl, saveFormData)
      .then((response) => {
        SetformloadingStatus(false);
        const { status, message } = response.data;
        if (response.status === 200) {
          const data = response.data;
          toast.success(response.data.message);
          // setData(data.products.data); // Update the state with the fetched data
          console.log(data.products);
        } else {
          // Handle errors, e.g., show an error message
          toast.error("Error ");
        }
      })
      .catch((error) => {
        // SetformloadingStatus(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error("Error: " + error.response.data.message); // Display the error message from the response
        }
      });
  };



  const getImageExtension = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 1];
  };

  const [cartDetails, setCart] = useState(null);
  const [bankPaymentInfo, setbankPaymentInfo] = useState(null);
  const [addressDetails, setAddress] = useState(null);
  const [razorpayPaymentInfo, setRazorpayPaymentInfo] = useState(null);
  const [countryData, setCountry] = useState("");
  const [CountryStateData, setCountryState] = useState("");
  const [CityData, setCity] = useState("");




  const [shippings, setShippings] = useState(null);

  const [isLoading, setLoading] = useState(true);
  const [totalCart, setTotalCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const getData = async () => {
    if (!userDetails) return;
    setLoading(true);
    const filterData = {
      user_id: userDetails.id,
    };

    POST(CheckOutUrl, filterData)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setCart(response.data.cartProducts);
          setbankPaymentInfo(response.data.bankPaymentInfo);
          setAddress(response.data.addresses);
          setRazorpayPaymentInfo(response.data.razorpayPaymentInfo);
          setShippings(response.data.shippings);
          setCountry(response.data.Country);
          setCountryState(response.data.CountryState);
          setCity(response.data.City);

          setTotalCart(response.data.total_cart);
          setTotalPrice(response.data.total_price);
        } else toast.error("Error Fectch Failed Data");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error("Error: " + error.response.data.message); // Display the error message from the response
        }
      });
  };

  const title = `Checkout ${TitleSuffix}`;

  useEffect(() => {
    document.title = title;
    getData();
    // console.log('localstorage', localStorage.getItem('checkout_product'));
  }, [title]);

  // console.log(totalPrice);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (event, tab) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  const [orderID, setOrderId] = useState(null);

  const createOrder = async () => {
    const formData = {
      user_id: userDetails.id,
      total_price: totalPrice,
      qty: totalCart,
      // razorpay_payment_id:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    };

    const response = await fetch(OrderCreateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOrderId(data.order.order_id);
      return data;
    } else {
      console.error("Error creating order");
      return null;
    }
  };

  console.log(orderID);

  const checkoutHandler = async () => {
    const orderData = await createOrder();
    console.log(orderData.order.order_id
    );
    const amountInPaise = totalPrice * 100;
    if (orderData) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
        amount: amountInPaise, // Amount in paisa
        currency: "INR",
        name: userDetails.name,
        description: "Test Transaction",
        order_id: orderID, // Order ID from backend
        // handler: function (response) {
        //     alert('Payment successful');
        // },
        callback_url: "/api/paymentverification",
        prefill: {
          name: "Your Name",
          email: "email@example.com",
          contact: "9999999999",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
  };



  return (
    <>
      <div className="checkout-wrapper spaceingtop">
        <div className="container-fluid">
          <h1>Checkout</h1>

          <div className="tabber-wrapper row">
            <div className="col-md-8">
              <div className="tabber">
                <ul className="tabber-list">
                  <li>
                    <a
                      href="#tab1"
                      onClick={(e) => handleTabClick(e, "tab1")}
                      className={activeTab === "tab1" ? "active" : ""}
                    >
                      Shipping Details
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tab2"
                      onClick={(e) => handleTabClick(e, "tab2")}
                      className={activeTab === "tab2" ? "active" : ""}
                    >
                      Billing
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tabber-content-wrapper">
                {activeTab === "tab1" && (
                  <div className="tabber-content" id="tab1">
                    <div className="heading">
                      <h6>Add Shipping Address</h6>
                    </div>
                    <div className="row Payment-input">
                      <div className="form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="input-wrap">
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              placeholder="Name"

                              {...register("name", {
                                required: "please enter a name",
                              })}
                            />
                            <div className="d-flex">

                              <ErrorMessage errors={errors} name="name" />

                            </div>
                            <input
                              type="email"
                              className="form-control"
                              id="lastname"
                              placeholder="Email"
                              {...register("email", {
                                required: "please enter a email",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Invalid Email Address",
                                },
                              })}
                            />
                            <span>
                              <ErrorMessage errors={errors} name="email" />
                            </span>
                          </div>
                          <div className="input-wrap">
                            <input
                              type="tel"
                              className="form-control"
                              id="tel"
                              placeholder="Phone Number"
                              {...register("phone")}
                            />

                            <input
                              type="number"
                              className="form-control"
                              id="GSTNumber"
                              placeholder="GST Number"
                              name="number"
                              {...register("gst_number")}
                            />
                          </div>
                          <div className="input-wrap">
                            <input
                              type="address"
                              className="form-control"
                              id="message"
                              placeholder="Street Address"
                              {...register("address")}
                            />
                          </div>
                          <div className="input-wrap">
                            {/* <input
                              type="city"
                              className="form-control"
                              id="city"
                              placeholder="City"
                              {...register("city_id")}
                            />
                            <input
                              type="State"
                              className="form-control"
                              id="state"
                              placeholder="State"
                              {...register("state_id")}
                            /> */}
                            <select
                              className="select__input form-control"
                              {...register("city_id", {
                                required: "please select a city",
                              })}
                            // id="country-selector"
                            >
                              <option value="0">Select City</option>

                              {CityData && CityData.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>

                            {" "}
                            <select
                              className="select__input form-control"
                              {...register("state_id", {
                                required: "please select a state",
                              })}
                            // id="country-selector"
                            >
                              <option value="0">Select State</option>

                              {CountryStateData && CountryStateData.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>

                            <input
                              type="password"
                              className="form-control"
                              id="Pincode"
                              placeholder="Pincode"
                              // name="password"
                              {...register("pin_code")}
                            />

                            <select
                              className="select__input form-control"
                              {...register("country_id", {
                                required: "please select a country",
                              })}
                              id="country-selector"
                            >
                              <option value="0">Select Country</option>

                              {countryData && countryData.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <span>
                              <ErrorMessage errors={errors} name="country_id" />
                            </span>
                          </div>
                          <div className="checkbox-wrap">
                            <input
                              type="checkbox"
                              id="vehicle1"
                              name="checkbox1"
                              value="1"
                            />
                            <label>Use as default address</label>
                            <br />
                            <input
                              type="checkbox"
                              id="vehicle2"
                              name="checkbox2"
                              value="1"
                            />
                            <label>Use same for billing address</label>
                            <br />
                          </div>

                          <div className="checkbox-btn">
                            <button type="submit" className="btn btn-primary">
                              Save Address
                            </button>
                            <button type="submit" className="btn btn-primary">
                              + Add New Address
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "tab2" && (
                  <div className="tabber-content" id="tab2">
                    <div className="heading">
                      <h6>Make Payment</h6>
                    </div>
                    <div className="row Payment-input">
                      <div className="col-6 PaymentBox">
                        <input
                          type="radio"
                          id="radio"
                          name="radio"
                          value="radio"
                        />
                        <span>Credit or debit card</span>
                      </div>
                      <div className="col-6 payment-icon">
                        <ul>
                          <li>
                            <img src="/img/Payment-logo1.png" alt="" />
                          </li>
                          <li>
                            <img src="/img/Payment-logo2.png" alt="" />
                          </li>
                          <li>
                            <img src="/img/Payment-logo3.png" alt="" />
                          </li>
                          <li>
                            <img src="/img/Payment-logo4.png" alt="" />
                          </li>
                        </ul>
                      </div>

                      <div className="form">
                        <form onSubmit={handleSubmit(onBankSubmit)}>
                          <div className="input-wrap">
                            <input
                              type="name"
                              className="form-control"
                              id="name"
                              placeholder="User Name"
                              name="name"
                              {...register("pin_code")}
                            />
                            <input
                              type="number"
                              className="form-control"
                              id="number"
                              placeholder="Card Number"
                              name="number"
                              {...register("pin_code")}
                            />
                          </div>
                          <div className="input-wrap">
                            <input
                              type="date"
                              id="birthday"
                              className="form-control"
                              placeholder="Expiry Date"
                              name="birthday"
                              {...register("pin_code")}
                            />
                            <input
                              type="cvv"
                              className="form-control"
                              id="cvv"
                              placeholder="CVV"
                              name="cvv"
                              {...register("pin_code")}
                            />
                          </div>

                          <button type="submit" className="btn btn-primary">
                            Payment
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <h3>Order Summary</h3>
                <div className="inner-content top-img-content">
                  {cartDetails && cartDetails.length > 0 ? (
                    cartDetails.map((item) => {
                      return (
                        <>
                          <ul>
                            <li>
                              <button type="button" className="btn btn-link">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    width="24"
                                    height="24"
                                    rx="12"
                                    fill="white"
                                    fill-opacity="0.15"
                                  />
                                  <path
                                    d="M8.46387 15.5351L15.5359 8.46509M8.46387 8.46509L15.5359 15.5351"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                  />
                                </svg>
                              </button>
                            </li>
                            <li>
                              {" "}
                              <img
                                height={180}
                                width={150}
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
                            </li>
                            <li>
                              <h4>{item.product.name}</h4>
                            </li>
                            <li>
                              {" "}
                              <span className="price">
                                ₹{item.product.price}/-
                              </span>
                            </li>
                          </ul>
                        </>
                      );
                    })
                  ) : (
                    <h4>No Prodcuts..</h4>
                  )}

                  {/* <ul>
                    <li>
                      <button type="button" className="btn btn-link">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="12"
                            fill="white"
                            fill-opacity="0.15"
                          />
                          <path
                            d="M8.46387 15.5351L15.5359 8.46509M8.46387 8.46509L15.5359 15.5351"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      {" "}
                      <img src="img/checkout-img2.png" alt="" />
                    </li>
                    <li>
                      <h4>Majestic Deer</h4>
                    </li>
                    <li>
                      {" "}
                      <span className="price">₹51,000/-</span>
                    </li>
                  </ul> */}

                  <hr />
                </div>
                <div className="inner-content bottom-content">
                  <div className="item">
                    <h4>Coupon Cost</h4>
                    <span className="price">₹0/-</span>
                  </div>
                  <div className="item">
                    <h4>Delivery Fee</h4>
                    <span className="price">₹0/-</span>
                  </div>
                  <div className="item">
                    <h4>Total Cost</h4>
                    <span className="price">₹{totalPrice}/-</span>
                  </div>
                  <hr />
                  <div className="item total-amount">
                    <h4>Sub Total ({totalCart})</h4>
                    <span className="price">₹{totalPrice}/-</span>
                  </div>
                  <button
                    onClick={() => checkoutHandler({ totalPrice })}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Payment
                  </button>

                  <Script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    strategy="lazyOnload"
                    onLoad={() => console.log("Razorpay loaded")}
                  />

                  <div className="bottom-text">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="14"
                        viewBox="0 0 17 14"
                        fill="none"
                      >
                        <mask id="path-1-inside-1_321_1255" fill="white">
                          <path d="M10.3217 2.85362H13.9646C14.6087 2.85362 15.2264 3.10949 15.6818 3.56493C16.1373 4.02038 16.3931 4.63809 16.3931 5.28219V10.1393H14.5717M1.82171 10.1393H0.607422V1.63933C0.607422 1.31729 0.735355 1.00843 0.963078 0.780705C1.1908 0.552982 1.49966 0.425049 1.82171 0.425049H9.10742C9.42947 0.425049 9.73833 0.552982 9.96605 0.780705C10.1938 1.00843 10.3217 1.31729 10.3217 1.63933V10.1393M9.71457 10.1393H6.67885H9.71457Z" />
                        </mask>
                        <path
                          d="M10.3217 1.55362C9.60374 1.55362 9.02171 2.13565 9.02171 2.85362C9.02171 3.57159 9.60374 4.15362 10.3217 4.15362V1.55362ZM13.9646 2.85362V1.55362V2.85362ZM16.3931 10.1393V11.4393C17.1111 11.4393 17.6931 10.8573 17.6931 10.1393H16.3931ZM14.5717 8.83933C13.8537 8.83933 13.2717 9.42136 13.2717 10.1393C13.2717 10.8573 13.8537 11.4393 14.5717 11.4393V8.83933ZM1.82171 11.4393C2.53968 11.4393 3.12171 10.8573 3.12171 10.1393C3.12171 9.42136 2.53968 8.83933 1.82171 8.83933V11.4393ZM0.607422 10.1393H-0.692578C-0.692578 10.8573 -0.110548 11.4393 0.607422 11.4393L0.607422 10.1393ZM1.82171 0.425049V-0.874951V0.425049ZM9.10742 0.425049V-0.874951V0.425049ZM9.02171 10.1393C9.02171 10.8573 9.60374 11.4393 10.3217 11.4393C11.0397 11.4393 11.6217 10.8573 11.6217 10.1393H9.02171ZM9.71457 11.4393C10.4325 11.4393 11.0146 10.8573 11.0146 10.1393C11.0146 9.42136 10.4325 8.83933 9.71457 8.83933V11.4393ZM6.67885 8.83933C5.96088 8.83933 5.37885 9.42136 5.37885 10.1393C5.37885 10.8573 5.96088 11.4393 6.67885 11.4393V8.83933ZM10.3217 4.15362H13.9646V1.55362H10.3217V4.15362ZM13.9646 4.15362C14.2639 4.15362 14.5509 4.27252 14.7626 4.48417L16.6011 2.64569C15.9018 1.94645 14.9534 1.55362 13.9646 1.55362V4.15362ZM14.7626 4.48417C14.9742 4.69582 15.0931 4.98288 15.0931 5.28219H17.6931C17.6931 4.29331 17.3003 3.34494 16.6011 2.64569L14.7626 4.48417ZM15.0931 5.28219V10.1393H17.6931V5.28219H15.0931ZM16.3931 8.83933H14.5717V11.4393H16.3931V8.83933ZM1.82171 8.83933H0.607422V11.4393H1.82171V8.83933ZM1.90742 10.1393V1.63933H-0.692578V10.1393H1.90742ZM1.90742 1.63933C1.90742 1.66207 1.89839 1.68387 1.88232 1.69994L0.0438392 -0.138534C-0.427681 0.332986 -0.692578 0.972505 -0.692578 1.63933H1.90742ZM1.88232 1.69994C1.86624 1.71602 1.84444 1.72505 1.82171 1.72505V-0.874951C1.15488 -0.874951 0.515359 -0.610054 0.0438392 -0.138534L1.88232 1.69994ZM1.82171 1.72505H9.10742V-0.874951H1.82171V1.72505ZM9.10742 1.72505C9.08469 1.72505 9.06289 1.71602 9.04681 1.69994L10.8853 -0.138534C10.4138 -0.610054 9.77425 -0.874951 9.10742 -0.874951V1.72505ZM9.04681 1.69994C9.03074 1.68387 9.02171 1.66207 9.02171 1.63933H11.6217C11.6217 0.972504 11.3568 0.332986 10.8853 -0.138534L9.04681 1.69994ZM9.02171 1.63933V10.1393H11.6217V1.63933H9.02171ZM9.71457 8.83933H6.67885V11.4393H9.71457V8.83933Z"
                          fill="white"
                          fill-opacity="0.4"
                          mask="url(#path-1-inside-1_321_1255)"
                        />
                        <path
                          d="M12.4464 11.9179C12.0552 11.9179 11.6801 11.7625 11.4034 11.4859C11.1268 11.2092 10.9714 10.8341 10.9714 10.4429C10.9714 10.0517 11.1268 9.6765 11.4034 9.39989C11.6801 9.12327 12.0552 8.96787 12.4464 8.96787C12.8376 8.96787 13.2128 9.12327 13.4894 9.39989C13.766 9.6765 13.9214 10.0517 13.9214 10.4429C13.9214 10.8341 13.766 11.2092 13.4894 11.4859C13.2128 11.7625 12.8376 11.9179 12.4464 11.9179ZM4.25 11.9179C3.85881 11.9179 3.48363 11.7625 3.20702 11.4859C2.9304 11.2092 2.775 10.8341 2.775 10.4429C2.775 10.0517 2.9304 9.6765 3.20702 9.39989C3.48363 9.12327 3.85881 8.96787 4.25 8.96787C4.64119 8.96787 5.01637 9.12327 5.29298 9.39989C5.5696 9.6765 5.725 10.0517 5.725 10.4429C5.725 10.8341 5.5696 11.2092 5.29298 11.4859C5.01637 11.7625 4.64119 11.9179 4.25 11.9179Z"
                          stroke="white"
                          stroke-opacity="0.4"
                          stroke-width="1.3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Safe Shipping Within 7 Working Days
                    </span>
                    <ul>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M7.00033 0.256592L12.8337 2.29826V6.99993C12.8337 9.40734 11.3561 11.0903 9.97766 12.135C9.146 12.7598 8.23353 13.269 7.26516 13.6488C7.24829 13.6553 7.23137 13.6617 7.21441 13.668L7.19983 13.6733L7.19574 13.6744L7.19399 13.675C7.19341 13.675 7.19283 13.675 7.00033 13.1249L6.80724 13.6756L6.80491 13.6744L6.80083 13.6733L6.78624 13.6674C6.70833 13.6386 6.63093 13.6085 6.55408 13.577C5.65253 13.2052 4.80184 12.7205 4.02241 12.1344C2.64574 11.0908 1.16699 9.40793 1.16699 7.00051V2.29826L7.00033 0.256592ZM7.00033 13.1249L6.80724 13.6756L7.00033 13.7433L7.19341 13.6756L7.00033 13.1249ZM7.00033 12.4996L7.00558 12.4973C7.81284 12.1639 8.57469 11.7297 9.27299 11.2052C10.5202 10.2608 11.667 8.88001 11.667 6.99993V3.12659L7.00033 1.49326L2.33366 3.12659V6.99993C2.33366 8.88001 3.48049 10.2596 4.72766 11.2058C5.42749 11.7314 6.19113 12.1661 7.00033 12.4996ZM10.5423 4.86668L6.41758 8.99143L3.94249 6.51693L4.76791 5.69151L6.41699 7.34176L9.71691 4.04184L10.5423 4.86668Z"
                            fill="white"
                            fill-opacity="0.4"
                          />
                        </svg>
                        Secure Payment
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_321_1262)">
                            <path
                              d="M6.99967 12.2499C7.68911 12.2499 8.3718 12.1141 9.00876 11.8503C9.64572 11.5865 10.2245 11.1997 10.712 10.7122C11.1995 10.2247 11.5862 9.64597 11.85 9.00901C12.1139 8.37205 12.2497 7.68936 12.2497 6.99992C12.2497 6.31048 12.1139 5.62779 11.85 4.99083C11.5862 4.35387 11.1995 3.77512 10.712 3.28761C10.2245 2.8001 9.64572 2.41339 9.00876 2.14955C8.3718 1.88571 7.68911 1.74992 6.99967 1.74992C5.60729 1.74992 4.27193 2.30304 3.28736 3.28761C2.3028 4.27217 1.74967 5.60753 1.74967 6.99992C1.74967 8.39231 2.3028 9.72766 3.28736 10.7122C4.27193 11.6968 5.60729 12.2499 6.99967 12.2499ZM13.4163 6.99992C13.4163 10.5437 10.5434 13.4166 6.99967 13.4166C3.45592 13.4166 0.583008 10.5437 0.583008 6.99992C0.583008 3.45617 3.45592 0.583252 6.99967 0.583252C10.5434 0.583252 13.4163 3.45617 13.4163 6.99992ZM8.74967 9.57475L6.41634 7.24142V3.20825H7.58301V6.75842L9.57451 8.74992L8.74967 9.57475Z"
                              fill="white"
                              fill-opacity="0.4"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_321_1262">
                              <rect width="14" height="14" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Timely Delivery
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingDetails;
