"use client";
import React, { useEffect, useState } from "react";
import {
  ImageBaseUrl,
  SearchProductUrl,
  AllProductUrl,
  TitleSuffix,
} from "../../config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import axios from "axios";
import Link from "next/link";
import Loading from "../../helpers/Loader";
import SkeletonProductLoader from "../../helpers/SkeletonProductLoader";
import POST from "../../axios/post";
import { useSearchParams } from "next/navigation";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import LoginPopup from "../LoginPopup";
import { Modal } from "react-bootstrap";
import Pagination from "../pagination/index";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  setWishList,
  removeFromWishList,
} from "../../redux/reducer/wishlistReducer";

const index = (price) => {
  const searchParams = useSearchParams();
  const minPriceValue = searchParams.get("minPrice");
  const maxPriceValue = searchParams.get("maxPrice");
  const dispatch = useDispatch();

  //user reducer
  const { user } = useSelector((state) => state.User);
  const userDetails = user && JSON.parse(user);

  //wishlist reducer
  const { wishlist } = useSelector((state) => state.WishList);

  useEffect(() => {}, [dispatch, user, wishlist]);

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

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleRangeChange = (event) => {
    const value = event.target.value;
    // Calculate the actual price based on the range value
    const price = value * 1000;
    setMinPrice(price);
    // Assuming max price is twice the min price for demonstration
    setMaxPrice(price * 2);
  };

  const [width, setWidth] = useState(""); // Initial width value
  const [height, setHeight] = useState(""); // Initial height value

  // Handler function to update width value
  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };

  // Handler function to update height value
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const [data, setData] = useState(null);
  const [catData, setCatData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [specifications, setspecifications] = useState(null);
  const [artist, setartist] = useState(null);
  const [formData, setFormData] = useState();

  const [priceData, setPriceData] = useState(null); // Assuming priceData comes from somewhere

  const [Pagi, SetPagi] = useState(0);
  const [currPage, SetcurrPage] = useState(0);
  const [perPageItem, SetPerPageItem] = useState("");

  const getData = async (pagev) => {
    if (!minPriceValue && !maxPriceValue) return;
    setLoading(true);
    const filterData = {
      page: pagev,
      per_page: perPageItem,
      minPrice: minPriceValue,
      maxPrice: maxPriceValue,
    };

    POST(AllProductUrl, filterData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          setPriceData(data.products.data);
          SetPagi(data.products.total);
          SetcurrPage(data.products.current_page);
          SetPerPageItem(data.products.per_page);
          setspecifications(data.specifications);
          setartist(data.artist);
          setCatData(data.categories);
        } else toast.error("Error Fectch Failed Data");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(false, error.message);
      });
  };

  const filterItem = (name, value, other) => {
    console.log(value);
    switch (name) {
      case "perpage":
        setLoading(true);
        const per = Number(value);
        SetPerPageItem(per);
        getData(1, per);
        break;
      case "pagi":
        SetcurrPage(value);
        getData(value, perPageItem);
        break;
      default:
        getData(currPage, perPageItem);
        break;
    }
  };

  const title = `Products${TitleSuffix}`;

  useEffect(() => {
    document.title = title;

    getData(1, perPageItem);
  }, [minPriceValue, maxPriceValue, title]);

  const getImageExtension = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 1];
  };

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [formloadingStatus, SetformloadingStatus] = useState(false);

  const onSubmit = async (formData) => {
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

  const totalPages = Math.ceil(Pagi / perPageItem);

  const handleClick = () => {
    resetField(
      "specification",
      "artist",
      "width_range",
      "height_range",
      "shorting_id",
      "category"
    );

    setData([]);
    getData(1, perPageItem);
    setWidth("");
    setHeight("");
    setFormData({
      min_price: "",
      max_price: "",
      height_range: "",
      width_range: "",
    });
  };
  return (
    <div className="section listing">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="col-left">
                {/* {catName && <h1>{catName}</h1>} */}
                <div className="header-row">
                  Products
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-secondary"
                  >
                    Clear
                  </button>
                </div>
                <div className="filter-box">
                  <button type="button" className="btn btn-link closeBtn">
                    <span className="plus"></span>
                  </button>

                  <div id="accordion" className="box">
                    {specifications && specifications.length > 0 ? (
                      specifications.map((item, index) => (
                        <>
                          {item.key === "Orientation" ? (
                            <div className="card mt-2">
                              <div className="card-header">
                                <a
                                  className="collapsed btn"
                                  data-bs-toggle="collapse"
                                  href="#collapseTwo"
                                >
                                  Orientation
                                  <span className="plus"></span>
                                </a>
                              </div>
                              <div
                                id="collapseTwo"
                                className="collapse"
                                data-bs-parent="#accordion"
                              >
                                <div className="card-body">
                                  <div className="checkbox-wrap">
                                    {item.product_specifications_value &&
                                    item.product_specifications_value.length >
                                      0 ? (
                                      item.product_specifications_value.map(
                                        (prItem, index1) => (
                                          <div className="box">
                                            <input
                                              type="checkbox"
                                              id="horizontal-checkbox"
                                              {...register("specification")}
                                              value={prItem.value}
                                            />
                                            <label htmlFor="horizontal-checkbox">
                                              {prItem.value}
                                            </label>
                                          </div>
                                        )
                                      )
                                    ) : (
                                      <p>No Records...</p>
                                    )}

                                    {/* <div className="box">
                                         <input
                                           type="checkbox"
                                           id="vertical-checkbox"
                                           {...register("orientation")}
                                           value="vertical"
                                         />
                                         <label htmlFor="vertical-checkbox">
                                           Vertical
                                         </label>
                                       </div>
                                       <div className="box">
                                         <input
                                           type="checkbox"
                                           id="square-checkbox"
                                           {...register("orientation")}
                                           value="square"
                                         />
                                         <label htmlFor="square-checkbox">Square</label>
                                       </div>
                                       <div className="box">
                                         <input
                                           type="checkbox"
                                           id="panoramic-checkbox"
                                           {...register("orientation")}
                                           value="panoramic"
                                         />
                                         <label htmlFor="panoramic-checkbox">
                                           Panoramic
                                         </label>
                                       </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))
                    ) : (
                      <p>No Records...</p>
                    )}
                    <div
                      id="collapseFour"
                      className="collapse"
                      data-bs-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="size-wrap">
                          <div className="btn-group">
                            <button type="button" className="btn btn-link">
                              Cm
                            </button>
                            {/* <button type="button" className="btn btn-link">
                                  Inches
                                </button> */}
                          </div>

                          <div className="range-input widthrange">
                            <h4>Width Range</h4>

                            <input
                              id="widthRange"
                              type="range"
                              className="range"
                              value={width}
                              onChange={handleWidthChange}
                              min="0"
                              max="500"
                            />
                          </div>
                          <div className="price-wrap rangesize">
                            <span>{width && width ? width : "0"}</span>
                            <span>500</span>
                          </div>

                          <div className="range-input heightrange">
                            <h4>Height Range</h4>

                            <input
                              type="range"
                              id="heightRange"
                              className="range"
                              value={height}
                              onChange={handleHeightChange}
                              min="0"
                              max="500"
                            />
                          </div>
                          <div className="price-wrap rangesize">
                            <span>{height && height ? height : "0"}</span>
                            <span>500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {specifications && specifications.length > 0 ? (
                      specifications.map((item, index) => (
                        <>
                          {item.key === "Style" ? (
                            <div className="card">
                              <div className="card-header">
                                <a
                                  className="collapsed btn"
                                  data-bs-toggle="collapse"
                                  href="#collapseThree"
                                >
                                  Style
                                  <span className="plus"></span>
                                </a>
                              </div>
                              <div
                                id="collapseThree"
                                className="collapse"
                                data-bs-parent="#accordion"
                              >
                                <div className="card-body">
                                  <div className="checkbox-menu">
                                    <ul>
                                      {item.product_specifications_value &&
                                      item.product_specifications_value.length >
                                        0 ? (
                                        item.product_specifications_value.map(
                                          (prItem, index1) => (
                                            <li>
                                              <a href="#">
                                                <input
                                                  type="checkbox"
                                                  id={`checkbox-${prItem.id}`}
                                                  {...register("specification")}
                                                  value={prItem.value}
                                                />
                                                <span>{prItem.value}</span>
                                              </a>
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <p>No Records...</p>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))
                    ) : (
                      <p>No Records...</p>
                    )}

                    {specifications && specifications.length > 0 ? (
                      specifications.map((item, index) => (
                        <>
                          {item.key === "Color" ? (
                            <div className="card">
                              <div className="card-header">
                                <a
                                  className="collapsed btn"
                                  data-bs-toggle="collapse"
                                  href="#collapseFive"
                                >
                                  Color
                                  <span className="plus"></span>
                                </a>
                              </div>

                              <div
                                id="collapseFive"
                                className="collapse"
                                data-bs-parent="#accordion"
                              >
                                <div className="card-body">
                                  <div className="checkbox-menu">
                                    <ul>
                                      {item.product_specifications_value &&
                                      item.product_specifications_value.length >
                                        0 ? (
                                        item.product_specifications_value.map(
                                          (prItem, index1) => (
                                            <li>
                                              <a href="#">
                                                <input
                                                  type="checkbox"
                                                  id={`checkbox-${prItem.id}`}
                                                  {...register("specification")}
                                                  value={prItem.value}
                                                />
                                                <span>{prItem.value}</span>
                                              </a>
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <p>No Records...</p>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))
                    ) : (
                      <p>No Records...</p>
                    )}

                    {specifications && specifications.length > 0 ? (
                      specifications.map((item, index) => (
                        <>
                          {item.key === "Medium" ? (
                            <div className="card">
                              <div className="card-header">
                                <a
                                  className="collapsed btn"
                                  data-bs-toggle="collapse"
                                  href="#collapseSix"
                                >
                                  Medium
                                  <span className="plus"></span>
                                </a>
                              </div>

                              <div
                                id="collapseSix"
                                className="collapse"
                                data-bs-parent="#accordion"
                              >
                                <div className="card-body">
                                  <div className="checkbox-menu">
                                    <ul>
                                      {item.product_specifications_value &&
                                      item.product_specifications_value.length >
                                        0 ? (
                                        item.product_specifications_value.map(
                                          (prItem, index1) => (
                                            <li>
                                              <a href="#">
                                                <input
                                                  type="checkbox"
                                                  id={`checkbox-${prItem.id}`}
                                                  {...register("specification")}
                                                  value={prItem.value}
                                                />
                                                <span>{prItem.value}</span>
                                              </a>
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <p>No Records...</p>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))
                    ) : (
                      <p>No Records...</p>
                    )}
                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          data-bs-toggle="collapse"
                          href="#collapseNine"
                        >
                          Category
                          <span className="plus"></span>
                        </a>
                      </div>
                      <div
                        id="collapseNine"
                        className="collapse"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="checkbox-menu">
                            <ul>
                              {catData && catData.length > 0 ? (
                                catData.map((catItem, index1) => (
                                  <li>
                                    <a href="#">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-${catItem.id}`}
                                        {...register("category")}
                                        value={catItem.slug}
                                      />
                                      <span>{catItem.name}</span>
                                    </a>
                                  </li>
                                ))
                              ) : (
                                <p>No Records...</p>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          data-bs-toggle="collapse"
                          href="#collapseSeven"
                        >
                          Artist
                          <span className="plus"></span>
                        </a>
                      </div>
                      <div
                        id="collapseSeven"
                        className="collapse"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="checkbox-menu">
                            <ul>
                              {artist && artist.length > 0 ? (
                                artist.map((artItem, index1) => (
                                  <li>
                                    <a href="#">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-${artItem.id}`}
                                        {...register("artist")}
                                        value={artItem.user.id}
                                      />
                                      <span>{artItem.user.name}</span>
                                    </a>
                                  </li>
                                ))
                              ) : (
                                <p>No Records...</p>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-link applyBtn">
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-9">
            <section className="Latest-collections desktop-lastest-collections">
              <div className="container-fluid">
                <form onChange={handleSubmit(onSubmit)}>
                  <div className="dropdown sortby">
                    {/* <ul className="dropdown-menu"> */}
                    {/* <li>
                    <a className="dropdown-item" href="#">
                     Select
                    </a>
                  </li>
                  <li>
                      <input
                            type="hidden"
                         value={1}
                            {...register("shorting_id")}
                          />
                    <a className="dropdown-item" href="#">
                    Newest
                    </a>
                  </li>
                  <li>
                  <input
                            type="hidden"
                         value={2}
                            {...register("shorting_id")}
                          />
                    <a className="dropdown-item" href="#">
                    Price : Low to High
                    </a>
                  </li>
                  <li>
                  <input
                            type="hidden"
                         value={3}
                            {...register("shorting_id")}
                          />
                    <a className="dropdown-item" href="#">
                    Price : High to Low</a>
                  </li> */}
                    <select {...register("shorting_id")} className="">
                      {/* <option value="select"  disabled>
                      Select
                    </option> */}
                      <option value="">Select </option>
                      <option value="1">Newest </option>
                      <option value="2">Price : Low to High </option>
                      <option value="3">Price : High to Low </option>
                    </select>
                    {/* </ul> */}
                  </div>
                </form>

                <div className="row">
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry>
                      {priceData && priceData.length > 0 ? (
                        priceData.map((item, index) => (
                          <div className="column">
                            <div className="imasonry-items">
                              <Link href={`/product/${item.slug}`}>
                                <div className="image">
                                  <img
                                    src={
                                      item.thumb_image
                                        ? `${ImageBaseUrl}products/${item.id}/${
                                            item.slug
                                          }-300.${getImageExtension(
                                            item.thumb_image
                                          )}`
                                        : "/img/no-image1.png"
                                    }
                                    alt={item.name}
                                  />
                                </div>
                              </Link>
                              <div className="content">
                                <Link href={`/product/${item.slug}`}>
                                  <div className="col-left">
                                    {/* <h5>{item.short_description.length > 50 ? `${item.short_description.slice(0, 50)}...` : item.short_description}</h5> */}
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
                                            removeFromWishList({
                                              id: item.wishlist.id,
                                            })
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
                                      fill={
                                        item && item.wishlist ? "fill" : "none"
                                      }
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
                                <button
                                  type="button"
                                  className="btn btn-link viewBtn"
                                >
                                  View
                                </button>
                              </Link>
                              <button
                                type="button"
                                className="btn btn-link addBtn"
                              >
                                Add to cart
                              </button>
                              {index < 3 && <hr />}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="justify-content-center">
                          <SkeletonProductLoader />
                        </div>
                      )}

                      {/* <Pagination
                        totalPage={totalPages && totalPages}
                        currPage={currPage}
                        filterItem={filterItem}
                      /> */}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              </div>
              <Modal show={show} onHide={handleModalClose}>
                <Modal.Body>
                  <LoginPopup handleModalClose={handleModalClose} />
                </Modal.Body>
              </Modal>
            </section>

            <section className="Latest-collections mobile-lastest-collections">
              <div className="container-fluid">
                <div className="row">
                  <h3>Latest Collections</h3>
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <div className="column">
                        <Link href={`/product/${item.slug}`}>
                          <div className="imasonry-items">
                            <div className="image">
                              <img
                                src={
                                  item.thumb_image
                                    ? `${ImageBaseUrl}products/${item.id}/${
                                        item.slug
                                      }-300.${getImageExtension(
                                        item.thumb_image
                                      )}`
                                    : "/img/no-image1.png"
                                }
                                alt={item.name}
                              />
                            </div>
                            <div className="content">
                              <div className="col-left">
                                {/* <h5>{item.name}</h5> */}
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
                                <span className="price">₹61,000</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-link viewBtn"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="btn btn-link addBtn"
                            >
                              Add to cart
                            </button>
                            <hr />
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="justify-content-center">
                      <SkeletonProductLoader />
                    </div>
                  )}

                  {/* <div className="btn-viewAll">
                  <button
                    type="button"
                    className="btn btn-link artBtn">
                    View All
                  </button>
                </div> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
