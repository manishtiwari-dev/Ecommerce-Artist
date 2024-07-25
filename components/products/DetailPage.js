// src/pages/product/[slug]/page.js
"use client";
import React, { useEffect, useState, useRef } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl, ProductDetailsUrl, AddToCartUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import POST from "../../axios/post";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { addToCart } from "../../redux/reducer/cartReducer";
import SkeltonProductDetails from "../../helpers/SkeltonProductDetails";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  addToWishlist,
  setWishList,
  removeFromWishList,
} from "../../redux/reducer/wishlistReducer";
import LoginPopup from "../LoginPopup";
import { Modal } from "react-bootstrap";
import LoginAddToCartPopup from "../LoginAddToCartPopup";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useRouter } from "next/navigation";

const DetailPage = ({ slug }) => {
  console.log('DetailPage slug', slug);
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const router = useRouter();

  //user reducer
  const { user } = useSelector((state) => state.User);
  const userDetails = user;

  //wishlist reducer
  const { wishlist } = useSelector((state) => state.WishList);
  const { cartData } = useSelector(state => state.Cart)

  // useEffect(() => {
  // if (userDetails && userDetails.id) {
  //   dispatch(setWishList(userDetails.id));
  // }
  // }, [dispatch, wishlist]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const [showCart, setShowCart] = useState(false);
  const handleModalCartClose = () => setShowCart(false);
  const handleModalCartShow = () => setShowCart(true);

  const handleAddToWishlist = (product, user) => {
    if (product.user) {
      setShow(false);
      dispatch(addToWishlist({ product, user }));
      return;
    } else {
      setShow(true);
    }
  };

  const handleAddToCart = (product, user, coupon_price) => {
    if (product.user) {
      setShowCart(false);

      // cartData.some(elem => console.;)

      dispatch(addToCart({ product, user, coupon_price }));
    } else {
      setShowCart(true);
    }
  };

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedProduct, setRelatedProducts] = useState(null);
  const [specification, setSpecification] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [artist, setArtist] = useState(null);

  const [loading, setLoading] = useState(true); // Add loading state

  console.log("product", product);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${ProductDetailsUrl}${slug}`, { signal });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data.product);
        setCategory(data.product.category);
        setRelatedProducts(data.relatedProducts);
        setSpecification(data.specifications);
        setGallery(data.gallery);
        setArtist(data.seller);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching product details:", error);
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      abortController.abort();
    };
  }, [slug]);

  const getImageExtension = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 1];
  };

  const getImageName = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 2];
  };

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(index + 1); // +1 because the main product image is the first slide
    }
  };

  return (
    <>
      {loading ? (
        <SkeltonProductDetails />
      ) : product ? (
        <div className="product-wrapper spaceingtop">
          <section className="breadcrumb">
            <div className="container-fluid">
              <div className="row">
                <ul>
                  <li>
                    <Link href="#">{category.name}</Link>
                  </li>
                  <span>/</span>
                  <li>{product.name}</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="product-info">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="item-image-parent row">
                    <div className="col-3 item-list-vertical">
                      {gallery && gallery.length > 0 ? (
                        gallery.map((item, index) => (
                          <div
                            className="thumb-box"
                            key={index}
                            onClick={() => handleThumbnailClick(index)}>
                            <img
                              height={180}
                              width={150}
                              src={
                                item.image
                                  ? `${ImageBaseUrl}products/gallery/${product.id
                                  }/${getImageName(
                                    item.image
                                  )}-550.${getImageExtension(item.image)}`
                                  : "/img/no-image1.png"
                              }
                              alt={`Slide ${index}`}
                            />
                          </div>
                        ))
                      ) : (
                        <img src="/img/no-image1.png" />
                      )}
                    </div>

                    <div className="col-9 item-image-main">
                      <div
                        id="carouselId"
                        className="carousel slide position-relative"
                        data-bs-ride="carousel">
                        <div
                          className="carousel-inner"
                          role="listbox">
                          <Swiper
                            ref={swiperRef}
                            slidesPerView={1}
                            centeredSlides={true}
                            speed={1000}
                            navigation={{
                              prevEl: ".carousel-control-prev",
                              nextEl: ".carousel-control-next",
                            }}
                            modules={[Autoplay, Navigation]}>
                            {/* <SwiperSlide key="main">
                              <div className="carouselItem rounded">
                                <img
                                  src={
                                    product.thumb_image
                                      ? `${ImageBaseUrl}products/${
                                          product.id
                                        }/${
                                          product.slug
                                        }-550.${getImageExtension(
                                          product.thumb_image
                                        )}`
                                      : "/img/no-image1.png"
                                  }
                                  alt={product.name}
                                />
                                <Link
                                  href="#"
                                  className="btn px-4 py-2 text-white rounded">
                                  Fruits
                                </Link>
                              </div>
                            </SwiperSlide> */}

                            {gallery && gallery.length > 0 ? (
                              gallery.map((item, index) => (
                                <SwiperSlide key={index}>
                                  <div className="carouselItem rounded">
                                    <img
                                      src={
                                        item.image
                                          ? `${ImageBaseUrl}products/gallery/${product.id
                                          }/${getImageName(
                                            item.image
                                          )}-550.${getImageExtension(
                                            item.image
                                          )}`
                                          : "/img/no-image1.png"
                                      }
                                      alt={`Slide ${index}`}
                                    />
                                    <Link
                                      href="#"
                                      className="btn px-4 py-2 text-white rounded">
                                      Fruits
                                    </Link>
                                  </div>
                                </SwiperSlide>
                              ))
                            ) : (
                              <>
                                <SwiperSlide key="no-image1">
                                  <div className="carouselItem rounded">
                                    <img
                                      src="/img/no-image1.png"
                                      alt="thumb"
                                      height={600}
                                      width={500}
                                    />
                                    <Link
                                      href="#"
                                      className="btn px-4 py-2 text-white rounded">
                                      Fruits
                                    </Link>
                                  </div>
                                </SwiperSlide>

                                <SwiperSlide key="no-image2">
                                  <div className="carouselItem rounded">
                                    <img
                                      src="/img/no-image1.png"
                                      alt="thumb"
                                      height={600}
                                      width={500}
                                    />
                                    <Link
                                      href="#"
                                      className="btn px-4 py-2 text-white rounded">
                                      Fruits
                                    </Link>
                                  </div>
                                </SwiperSlide>
                              </>
                            )}
                          </Swiper>
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselId"
                          data-bs-slide="prev">
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselId"
                          data-bs-slide="next">
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="item-info-parent">
                    <div className="main-info">
                      <h4>{product.name}</h4>
                      <div className="product-name">
                        <span>By {artist && artist.user.name}</span>
                        <div className="product-icon">
                          <ul>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none">
                                <path
                                  d="M22.2192 11.2089C22.1878 11.1379 21.4268 9.44977 19.7351 7.75801C17.4809 5.50383 14.6337 4.3125 11.5 4.3125C8.36624 4.3125 5.51909 5.50383 3.26491 7.75801C1.57316 9.44977 0.808585 11.1406 0.780734 11.2089C0.739867 11.3008 0.71875 11.4003 0.71875 11.5009C0.71875 11.6015 0.739867 11.701 0.780734 11.7929C0.812179 11.8639 1.57316 13.5511 3.26491 15.2429C5.51909 17.4962 8.36624 18.6875 11.5 18.6875C14.6337 18.6875 17.4809 17.4962 19.7351 15.2429C21.4268 13.5511 22.1878 11.8639 22.2192 11.7929C22.2601 11.701 22.2812 11.6015 22.2812 11.5009C22.2812 11.4003 22.2601 11.3008 22.2192 11.2089ZM11.5 17.25C8.7346 17.25 6.3187 16.2446 4.31878 14.2627C3.49819 13.4466 2.80005 12.5161 2.24609 11.5C2.7999 10.4838 3.49805 9.55324 4.31878 8.7373C6.3187 6.75535 8.7346 5.75 11.5 5.75C14.2654 5.75 16.6813 6.75535 18.6812 8.7373C19.5034 9.55305 20.2031 10.4836 20.7584 11.5C20.1106 12.7093 17.2886 17.25 11.5 17.25ZM11.5 7.1875C10.6471 7.1875 9.81328 7.44042 9.10409 7.91429C8.39491 8.38815 7.84216 9.06167 7.51576 9.84968C7.18936 10.6377 7.10396 11.5048 7.27035 12.3413C7.43675 13.1779 7.84748 13.9463 8.45059 14.5494C9.05371 15.1525 9.82212 15.5632 10.6587 15.7296C11.4952 15.896 12.3623 15.8106 13.1503 15.4842C13.9383 15.1578 14.6118 14.6051 15.0857 13.8959C15.5596 13.1867 15.8125 12.3529 15.8125 11.5C15.8113 10.3566 15.3566 9.26041 14.5481 8.45192C13.7396 7.64342 12.6434 7.18869 11.5 7.1875ZM11.5 14.375C10.9314 14.375 10.3755 14.2064 9.90273 13.8905C9.42994 13.5746 9.06144 13.1256 8.84384 12.6002C8.62624 12.0749 8.5693 11.4968 8.68023 10.9391C8.79117 10.3814 9.06498 9.86914 9.46706 9.46707C9.86913 9.06499 10.3814 8.79117 10.9391 8.68024C11.4968 8.56931 12.0749 8.62624 12.6002 8.84385C13.1255 9.06145 13.5746 9.42994 13.8905 9.90274C14.2064 10.3755 14.375 10.9314 14.375 11.5C14.375 12.2625 14.0721 12.9938 13.5329 13.5329C12.9938 14.0721 12.2625 14.375 11.5 14.375Z"
                                  fill="black"
                                  fill-opacity="0.8"
                                />
                              </svg>
                              {product.views}
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none">
                                <path
                                  d="M13.5 16.5C12.875 16.5 12.3438 16.2812 11.9062 15.8438C11.4688 15.4062 11.25 14.875 11.25 14.25C11.25 14.1625 11.2562 14.0717 11.2687 13.9777C11.2812 13.8837 11.3 13.7995 11.325 13.725L6.0375 10.65C5.825 10.8375 5.5875 10.9845 5.325 11.091C5.0625 11.1975 4.7875 11.2505 4.5 11.25C3.875 11.25 3.34375 11.0312 2.90625 10.5938C2.46875 10.1562 2.25 9.625 2.25 9C2.25 8.375 2.46875 7.84375 2.90625 7.40625C3.34375 6.96875 3.875 6.75 4.5 6.75C4.7875 6.75 5.0625 6.80325 5.325 6.90975C5.5875 7.01625 5.825 7.163 6.0375 7.35L11.325 4.275C11.3 4.2 11.2812 4.11575 11.2687 4.02225C11.2562 3.92875 11.25 3.838 11.25 3.75C11.25 3.125 11.4688 2.59375 11.9062 2.15625C12.3438 1.71875 12.875 1.5 13.5 1.5C14.125 1.5 14.6562 1.71875 15.0938 2.15625C15.5312 2.59375 15.75 3.125 15.75 3.75C15.75 4.375 15.5312 4.90625 15.0938 5.34375C14.6562 5.78125 14.125 6 13.5 6C13.2125 6 12.9375 5.947 12.675 5.841C12.4125 5.735 12.175 5.588 11.9625 5.4L6.675 8.475C6.7 8.55 6.71875 8.6345 6.73125 8.7285C6.74375 8.8225 6.75 8.913 6.75 9C6.75 9.087 6.74375 9.17775 6.73125 9.27225C6.71875 9.36675 6.7 9.451 6.675 9.525L11.9625 12.6C12.175 12.4125 12.4125 12.2657 12.675 12.1597C12.9375 12.0537 13.2125 12.0005 13.5 12C14.125 12 14.6562 12.2188 15.0938 12.6562C15.5312 13.0938 15.75 13.625 15.75 14.25C15.75 14.875 15.5312 15.4062 15.0938 15.8438C14.6562 16.2812 14.125 16.5 13.5 16.5ZM13.5 4.5C13.7125 4.5 13.8907 4.42825 14.0347 4.28475C14.1787 4.14125 14.2505 3.963 14.25 3.75C14.2495 3.537 14.1775 3.359 14.034 3.216C13.8905 3.073 13.7125 3.001 13.5 3C13.2875 2.999 13.1095 3.071 12.966 3.216C12.8225 3.361 12.7505 3.539 12.75 3.75C12.7495 3.961 12.8215 4.13925 12.966 4.28475C13.1105 4.43025 13.2885 4.502 13.5 4.5ZM4.5 9.75C4.7125 9.75 4.89075 9.678 5.03475 9.534C5.17875 9.39 5.2505 9.212 5.25 9C5.2495 8.788 5.1775 8.61 5.034 8.466C4.8905 8.322 4.7125 8.25 4.5 8.25C4.2875 8.25 4.1095 8.322 3.966 8.466C3.8225 8.61 3.7505 8.788 3.75 9C3.7495 9.212 3.8215 9.39025 3.966 9.53475C4.1105 9.67925 4.2885 9.751 4.5 9.75ZM13.5 15C13.7125 15 13.8907 14.928 14.0347 14.784C14.1787 14.64 14.2505 14.462 14.25 14.25C14.2495 14.038 14.1775 13.86 14.034 13.716C13.8905 13.572 13.7125 13.5 13.5 13.5C13.2875 13.5 13.1095 13.572 12.966 13.716C12.8225 13.86 12.7505 14.038 12.75 14.25C12.7495 14.462 12.8215 14.6402 12.966 14.7847C13.1105 14.9292 13.2885 15.001 13.5 15Z"
                                  fill="black"
                                  fill-opacity="0.8"
                                />
                              </svg>
                              0
                            </li>
                          </ul>
                        </div>
                      </div>
                      <hr />
                      <div className="aboutart">
                        <h6>About Art</h6>
                        <p
                          dangerouslySetInnerHTML={{ __html: product?.long_description }}
                        />
                        {/* <p>
                          {product?.long_description}
                        </p> */}
                      </div>
                    </div>

                    <div className="select-items">
                      <div className="tabber-wrapper">
                        <div className="tabber">
                          <ul className="tabber-list">

                            
                            <li>
                              <a>Specifications</a>
                            </li>
                         
                          </ul>
                        </div>
                        <div className="tabber-content-wrapper">
                          <div
                            className="tabber-content"
                            id="tab1">
                            <ul>
                              {specification && specification.length > 0 ? (
                                specification.map((item, index) => (
                                  <li onClick={() => console.log('item', item)} >
                                    <span className="left-text">
                                      {item?.name}:
                                    </span>

                                    {item.values &&
                                        item.values.length >
                                        0 ? (
                                        item.values.map(
                                          (prItem, index1) => (
                                            <span className="right-text">
                                              {prItem.specification}
                                            </span>
                                          )
                                        )
                                      ) : (
                                        <p>No Records...</p>
                                      )}

                                   
                                  </li>
                                ))
                              ) : (
                                <p>No Records...</p>
                              )}
                             

                              <li>
                                <span className="price">₹{product.price}</span>
                              </li>
                            </ul>

                            <div className="btn-group">
                              {/* <button type="button" className="btn btn-link">
                                ADD TO CART
                              </button> */}

                              <button
                                class="btn btn-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCart({
                                    product: product,
                                    user: userDetails && userDetails.id,
                                    coupon_price: product.price,
                                  });
                                }}>
                                <i class="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                                Add to cart
                                {/* {
                                 cartData.some(elem => elem.product.id === product?.id) ? (
                                    'Added to Cart'
                                  ) : (
                                    'Add to Cart'
                                  )
                                } */}
                              </button>

                              {/* <Link href={{ pathname: '/checkout', query: product }} > */}
                              <button
                                type="button"
                                className="btn btn-link"
                              // onClick={() => {
                              //   localStorage.setItem('checkout_product', JSON.stringify(product))
                              //   router.push('/checkout');
                              // }}
                              >
                                BUY NOW
                              </button>
                              {/* </Link> */}
                            </div>
                          </div>
                          {/* <div className="tabber-content" id="tab2">
                            <ul>
                              <li>
                                <span className="left-text">Size :</span>
                                <span className="right-text"> 40 X 80 in</span>
                              </li>
                              <li>
                                <span className="left-text">Medium :</span>
                                <span className="right-text">
                                  {" "}
                                  Paint on Paper
                                </span>
                              </li>
                              <li>
                                <span className="left-text">Style :</span>
                                <span className="right-text"> Conceptual</span>
                              </li>
                              <li>
                                <span className="left-text">Created in :</span>
                                <span className="right-text">2023</span>
                              </li>
                              <li>
                                <span className="left-text">Orientation :</span>
                                <span className="right-text">Vertical</span>
                              </li>
                              <li>
                                <span className="price">₹61,000</span>
                              </li>
                            </ul>
                            <div className="btn-group">
                              <button type="button" className="btn btn-link">
                                ADD TO CART
                              </button>
                              <button type="button" className="btn btn-link">
                                BUY NOW
                              </button>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      
                    </div>

                    {/* <!-- Description --> */}
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: product.long_description,
                      }}>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="aboutus">
            <div className="container-fluid">
              <div className="row">
                <h4>About Artist</h4>
                <div className="col-3 ">
                  <div className="image">
                    {artist && artist ? (
                      <img
                        src={
                          artist.user.image
                            ? `${ImageBaseUrl}${artist.user.image}`
                            : "/img/no-image1.png"
                        }
                        alt={artist.user.name}
                      />
                    ) : (
                      <img src="/img/no-image1.png" />
                    )}
                  </div>
                </div>
                <div className="col-9">
                  <div className="content">
                    <h6>{artist && artist.user.name}</h6>
                    <p>
                    {artist && artist.bio}
                    </p>
                 


                    <Link href={`/artist-profile/${artist && artist.artist_number}`}>
                    {/* <Link href="/artist-profile" > */}
                      <button
                        type="button"
                        className="btn btn-link">
                        View Artist Page
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="Latest-collections desktop-lastest-collections">
            <div className="container-fluid">
              <div className="row">
                <h4>Explore Other Art Work</h4>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                  <Masonry>
                    {relatedProduct && relatedProduct.length > 0 ? (
                      relatedProduct.map((item, index) => (
                        <div className="column">
                          <div className="imasonry-items">
                            <Link href={`/product/${item.slug}`}>
                              <div className="image">
                                <img
                                  src={
                                    item.thumb_image
                                      ? `${ImageBaseUrl}products/${item.id}/${item.slug
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
                                  <h5>
                                    {" "}
                                    {item.short_description.length > 50
                                      ? `${item.short_description.slice(
                                        0,
                                        50
                                      )}...`
                                      : item.short_description}
                                  </h5>
                                  <span>{item.name}</span>
                                  <h6>303X354 In</h6>
                                </div>
                              </Link>
                              <div className="col-right">
                                <div
                                  className="icon"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToWishlist({
                                      product: item,
                                      user: userDetails && userDetails.id,
                                    });
                                  }}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                      d="M14.1121 14.1683C12.258 15.792 10.3616 16.847 10.1025 16.987C9.84341 16.847 7.94699 15.792 6.09293 14.1683C4.13723 12.4556 2.40653 10.2643 2.40635 7.96042C2.40763 6.90777 2.82637 5.89858 3.57072 5.15423C4.31506 4.40988 5.32425 3.99115 6.37691 3.98987C7.72562 3.98997 8.87417 4.56674 9.58271 5.51041L10.1025 6.2027L10.6223 5.51041C11.3308 4.56674 12.4794 3.98997 13.8281 3.98987C14.8808 3.99115 15.8899 4.40988 16.6343 5.15423C17.3787 5.89867 17.7975 6.908 17.7987 7.96079C17.7983 10.2645 16.0677 12.4557 14.1121 14.1683Z"
                                      stroke="#6A5B9C"
                                      stroke-width="1.3"></path>
                                  </svg>
                                </div>
                                <span className="price">₹{item.price}</span>
                              </div>
                            </div>
                            <Link href={`/product/${item.slug}`}>
                              <button
                                type="button"
                                className="btn btn-link viewBtn">
                                View
                              </button>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-link addBtn">
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
            </div>
            <Modal
              show={show}
              onHide={handleModalClose}>
              <Modal.Body>
                <LoginPopup handleModalClose={handleModalClose} />
              </Modal.Body>
            </Modal>
            <Modal
              show={showCart}
              onHide={handleModalCartClose}>
              <Modal.Body>
                <LoginAddToCartPopup
                  handleModalCartClose={handleModalCartClose}
                />
              </Modal.Body>
            </Modal>
          </section>
          <section className="Latest-collections mobile-lastest-collections">
            <div className="container-fluid">
              <div className="row">
                <h3>Latest Collections</h3>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                  <Masonry>
                    {relatedProduct && relatedProduct.length > 0 ? (
                      relatedProduct.map((item, index) => (
                        <div className="column">
                          <div className="imasonry-items">
                            <Link href={`/product/${item.slug}`}>
                              <div className="image">
                                <img
                                  src={
                                    item.thumb_image
                                      ? `${ImageBaseUrl}products/${item.id}/${item.slug
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
                                  <h5>
                                    {" "}
                                    {item.short_description.length > 50
                                      ? `${item.short_description.slice(
                                        0,
                                        50
                                      )}...`
                                      : item.short_description}
                                  </h5>
                                  <span>{item.name}</span>
                                  <h6>303X354 In</h6>
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
                                  }}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill={
                                      item && item.wishlist ? "fill" : "none"
                                    }>
                                    <path
                                      d="M14.1121 14.1683C12.258 15.792 10.3616 16.847 10.1025 16.987C9.84341 16.847 7.94699 15.792 6.09293 14.1683C4.13723 12.4556 2.40653 10.2643 2.40635 7.96042C2.40763 6.90777 2.82637 5.89858 3.57072 5.15423C4.31506 4.40988 5.32425 3.99115 6.37691 3.98987C7.72562 3.98997 8.87417 4.56674 9.58271 5.51041L10.1025 6.2027L10.6223 5.51041C11.3308 4.56674 12.4794 3.98997 13.8281 3.98987C14.8808 3.99115 15.8899 4.40988 16.6343 5.15423C17.3787 5.89867 17.7975 6.908 17.7987 7.96079C17.7983 10.2645 16.0677 12.4557 14.1121 14.1683Z"
                                      stroke="#6A5B9C"
                                      stroke-width="1.3"></path>
                                  </svg>
                                </div>
                                <span className="price">₹{item.price}</span>
                              </div>
                            </div>
                            <Link href={`/product/${item.slug}`}>
                              <button
                                type="button"
                                className="btn btn-link viewBtn">
                                View
                              </button>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-link addBtn">
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
                <div className="btn-viewAll">
                  <button
                    type="button"
                    className="btn btn-link artBtn">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <SkeltonProductDetails />
      )}
    </>
  );
};

export default DetailPage;

