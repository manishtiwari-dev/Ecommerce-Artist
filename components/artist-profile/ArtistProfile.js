"use client";
import { useSelector } from "react-redux";
import POST from "../../axios/post";
import React, { useEffect, useState } from "react";
import {
  ImageBaseUrl,
  SearchProductUrl,
  SellerDetailsUrl,
  TitleSuffix,
} from "../../config";
import LoginPopup from "../LoginPopup";
import { Modal } from "react-bootstrap";
import LoginAddToCartPopup from "../LoginAddToCartPopup";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ArtistProfile(artNumber) {
  const { user } = useSelector((state) => state.User);
  const userDetails = user;

  console.log("user", user);
  const artist_number = artNumber.artNumber;

  console.log(artist_number);

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

  const [product, setProductData] = useState(null);

  const [artist, setartist] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [artWork, setArtwork] = useState(null);
  const [artist_type, setArtistType] = useState(null);


  const getData = async () => {
    setLoading(true);
    const filterData = {
      artist_number: artist_number,
    };

    POST(SellerDetailsUrl, filterData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setartist(response.data.seller);
          setArtwork(response.data.noOfArtWork);

		  setArtistType(response.data.artist_type);
          setProductData(response.data.products.data);

          setLoading(false);
        } else toast.error("Error Fectch Failed Data");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(false, error.message);
      });
  };

  console.log("artist", product);

  // const title = `${catName}${TitleSuffix}`;

  useEffect(() => {
    //   document.title = title;

    getData();
  }, [artist_number]);

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

  return (
    <>
      <div className="profile-wrapper artist-profile artist-profile2 spaceingtop">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h3>Artist Profile</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="artist-image">
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
            <div className="col-md-8">
              <div className="top-content">
                <div className="row align-items-end">
                  <div className="col-md-6">
                    <h4>{artist && artist.user.name}</h4>
                    <ul className="list1">
                      <li> {artist && artist.user.state.name}</li>
                      <span>|</span>
                      <li>{artWork && artWork} Artworks</li>
                    </ul>
                  </div>
                
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ul className="list2">
                    <li>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={21}
                          height={20}
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M10.8154 14.3999L14.2737 16.4916C14.907 16.8749 15.682 16.3083 15.5154 15.5916L14.5987 11.6583L17.657 9.00826C18.2154 8.52492 17.9154 7.60825 17.182 7.54992L13.157 7.20826L11.582 3.49159C11.2987 2.81659 10.332 2.81659 10.0487 3.49159L8.4737 7.19992L4.4487 7.54159C3.71537 7.59992 3.41537 8.51659 3.9737 8.99992L7.03203 11.6499L6.11537 15.5833C5.9487 16.2999 6.7237 16.8666 7.35703 16.4833L10.8154 14.3999Z"
                            fill="#6A5B9C"
                          />
                        </svg>
                      </div>
                      <span>{artist && artist.user.state.name}</span>
                    </li>
                    <li>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={21}
                          height={20}
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M10.8154 14.3999L14.2737 16.4916C14.907 16.8749 15.682 16.3083 15.5154 15.5916L14.5987 11.6583L17.657 9.00826C18.2154 8.52492 17.9154 7.60825 17.182 7.54992L13.157 7.20826L11.582 3.49159C11.2987 2.81659 10.332 2.81659 10.0487 3.49159L8.4737 7.19992L4.4487 7.54159C3.71537 7.59992 3.41537 8.51659 3.9737 8.99992L7.03203 11.6499L6.11537 15.5833C5.9487 16.2999 6.7237 16.8666 7.35703 16.4833L10.8154 14.3999Z"
                            fill="#6A5B9C"
                          />
                        </svg>
                      </div>
                      <span>{artist_type && artist_type}</span>
                    </li>
                  </ul>
                  <h6>About Artist</h6>
                  <p>
				  {artist && artist.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="Latest-collections desktop-lastest-collections">
            <div className="container-fluid">
              <div className="row" >
                <h4>Explore Other Art Work</h4>

                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                  <Masonry>
                    {product && product.length > 0 ? (
                      product.map((item, index) => (
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
                                  <h5>
                                    {" "}
                                    {/* {item.short_description.length > 50
                                      ? `${item.short_description.slice(
                                        0,
                                        50
                                      )}...`
                                      : item.short_description} */}
                                    {item.short_description}
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
                                  }}
                                >
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
                      <p>Loading...</p>
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            </div>

            <Modal show={show} onHide={handleModalClose}>
              <Modal.Body>
                <LoginPopup handleModalClose={handleModalClose} />
              </Modal.Body>
            </Modal>
            <Modal show={showCart} onHide={handleModalCartClose}>
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
                  columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                  <Masonry>
                    {product && product.length > 0 ? (
                      product.map((item, index) => (
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
                                  <h5>
                                    {" "}
                                    {/* {item.short_description.length > 50
                                      ? `${item.short_description.slice(
                                        0,
                                        50
                                      )}...`
                                      : item.short_description} */}
                                    {item.short_description}
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
                                  }}
                                >
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
                      <p>Loading...</p>
                    )}
                  </Masonry>
                </ResponsiveMasonry>

                <div className="btn-viewAll">
                  <button type="button" className="btn btn-link artBtn">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
