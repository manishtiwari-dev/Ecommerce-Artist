"use client";
import React, { useEffect, useState } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchCommonData } from "../../redux/reducer/commonReducer";
import Image from "next/image";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fab);

const Footer = () => {
  const dispatch = useDispatch();
  // const { homePageData, loading, dataFetched } = useSelector(
  //   (state) => state.Home
  // );

  const { CommonDetails, loading, dataFetched } = useSelector(
    (state) => state.Common
  );

  const { user } = useSelector((state) => state.User);
  // console.log("footer user", user);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchCommonData());
    }
  }, [dispatch, dataFetched]);

  const footerData = CommonDetails.footer;
  const socialLink = CommonDetails.social_links;
  const menuData = CommonDetails.catMenu;
  const artGallery = CommonDetails.look_for_style;
  const settingData = CommonDetails.setting;

  // useEffect(() => {
  //   if (!dataFetched) {
  //     dispatch(fetchHomeData());
  //   }
  // }, [dispatch, dataFetched]);

  return (
    <>
      <footer className="footer-wrapper">
        <div className="top-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 col-sm-3 boxes">
                <div className="box">
                  <div className="icon">
                    <Image
                      src="/img/tdesign_secured.png"
                      width={250}
                      height={50}
                      className="img-fluid"
                      alt="Secure Payment"
                    />
                  </div>
                  <span>Secure Payment</span>
                </div>
              </div>
              <div className="col-6 col-sm-3 boxes">
                <div className="box">
                  <div className="icon">
                    <Image
                      src="/img/material-symbols_wall-art-outline.png"
                      width={250}
                      height={50}
                      className="img-fluid"
                      alt="Selected Art Piece"
                    />
                  </div>
                  <span>Selected Art Piece</span>
                </div>
              </div>
              <div className="col-6 col-sm-3 boxes">
                <div className="box">
                  <div className="icon">
                    <Image
                      src="/img/streamline_shipping-truck.png"
                      width={250}
                      height={50}
                      className="img-fluid"
                      alt="Safe Shipping"
                    />
                  </div>
                  <span>Safe Shipping</span>
                </div>
              </div>
              <div className="col-6  col-sm-3 boxes">
                <div className="box">
                  <div className="icon">
                    <Image
                      src="/img/tdesign_time.png"
                      width={250}
                      height={50}
                      className="img-fluid"
                      alt="Timely Delivery"
                    />
                  </div>
                  <span>Timely Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="col col-one">
                  <div className="footer-logo">
                    <a href="#">
                      {/* <img src="img/Footer-logo.png" alt="Ray Artwala" /> */}
                      {settingData && (
                        <img
                          src={`${ImageBaseUrl}${settingData.logo}`}
                          alt="Ray Artwala"
                        />
                      )}
                      {/* <Image src="img/tdesign_time.png" width={250} height={50} className="img-fluid" alt="Timely Delivery"/> */}
                    </a>
                    <p>{footerData && footerData.about_us}</p>
                  </div>
                  <div className="contact-details">
                    <ul>
                      <li>
                        <a href="#">
                          <img
                            src="/img/mingcute_location-line.png"
                            alt="Location"
                          />
                          <span>{footerData && footerData.address}</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/img/ic_outline-email.png" alt="Email" />
                          <span>{footerData && footerData.email}</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src="/img/cil_phone.png" alt="Phone" />
                          <span>{footerData && footerData.phone}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col col-two">
                  <div className="links">
                    <ul>
                      <li>
                        <a href="#">OUICK LINKS</a>
                        <ul>
                          <li>
                            <Link href="/about-us">About Us</Link>
                          </li>
                          <li>
                            <Link href="/insights">Insights</Link>
                          </li>
                          <li>
                            <Link href="/contact">Contact Us</Link>
                          </li>
                          <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#">SELLER</a>
                        <ul>
                          {Object.keys(user || {}).length === 0 && (
                            <>
                              <li>
                                <Link href="/artist-login">Seller Login</Link>
                              </li>
                              <li>
                                <Link href="/artist-sign-up">Sell Your Work</Link>
                              </li>
                            </>
                          )}
                          <li>
                            <a href="#">Seller Guide</a>
                          </li>
                          <li>
                            <a href="#">Resources</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="social-media">
                    <h3>FOLLOW</h3>
                    <ul>
                      {socialLink && socialLink.length > 0 ? (
                        socialLink.map((item, index) => (
                          <li key={index} >
                            <a href={item.link}>
                              <i className={item.icon}></i>
                            </a>
                          </li>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}


                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col col-three">
                  <div className="links">
                    <ul>
                      <li>
                        <a href="#">ART CATEGORIES</a>
                        <ul>
                          {menuData && menuData.length > 0
                            ? menuData.slice(0, 6).map((item, index) => (
                              <li className="nav-item" key={index}>
                                <Link
                                  href={`/art-category/${item.category.slug}`}
                                  className="nav-link "
                                >
                                  {item.category.name}
                                </Link>
                              </li>
                            ))
                            : ""}
                        </ul>
                      </li>

                      <li>
                        <a href="#">ART GALLERY</a>
                        <ul>

                          {artGallery && artGallery.length > 0
                            ? artGallery.slice(0, 6).map((item, index) => (
                              <li key={index}>
                                <Link
                                  href={`/art-gallery/${item.slug}`}
                                  className="nav-link "
                                >
                                  {item.type_name}
                                </Link>
                              </li>
                            ))
                            : ""}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="logos">
                    <h3>PAYMENT</h3>
                    <ul>
                      {/* {footerData && (
                        <img
                          src={`${ImageBaseUrl}${footerData.payment_image}`}
                          alt=""
                        />
                      )} */}
                      <li>
                        <img src="/img/Logo1.png" alt="VISA" />
                      </li>
                      <li>
                        <img src="/img/logo2.png" alt="PayPal" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile">
              <div className="logos">
                <h3>PAYMENT</h3>
                <ul>
                  <li>
                    <img src="/img/Logo1.png" alt="VISA" />
                  </li>
                  <li>
                    <img src="/img/logo2.png" alt="PayPal" />
                  </li>
                </ul>
              </div>
              <div className="social-media">
                <h3>FOLLOW</h3>
                <ul>
                  {socialLink && socialLink.length > 0 ? (
                    socialLink.map((item, index) => (
                      <li key={index}>
                        <a href={item.link}>
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                  {/* <li>
                    <a href="#">
                      <img src="img/devicon_facebook.png" alt="Facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="img/skill-icons_instagram.png"
                        alt="Instagram"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="img/fa-brands_pinterest-square.png"
                        alt="Pinterest"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="img/skill-icons_twitter.png" alt="Twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="img/logos_youtube-icon.png" alt="Yputube" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/headphone.png" alt="Headphone" />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="row copyRight">
              <div className="col-md-4">
                <p>
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </p>
              </div>
              <div className="col-md-4">
                <p className="text-center">@ RayArtwala 2024</p>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </footer>
      <div className="floating_btn" bis_skin_checked="1">
        <a target="_blank" href="https://wa.me/+918800549957">
          <div className="contact_icon" bis_skin_checked="1">

            <FontAwesomeIcon icon={['fab', 'whatsapp']} size="20x" />
          </div>
        </a>
      </div>

    </>
  );
};

export default Footer;


