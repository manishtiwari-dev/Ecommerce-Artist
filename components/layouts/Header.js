"use client";
import { Products } from "../../helpers/ProductsArray";
import { clearCart, setCartItems, setTotalItems } from "../../redux/reducer/cartReducer";
import { setProducts } from "../../redux/reducer/productReducer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonData } from "../../redux/reducer/commonReducer";
import { ImageBaseUrl } from "../../config";
import { useRouter } from "next/navigation";
import { logoutState } from "../../redux/reducer/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const { CommonDetails, loading, dataFetched } = useSelector(
    (state) => state.Common
  );
  if (typeof window === "undefined") {
    // This code will run on the server
    return null;
  }
  //user reducer
  const { user } = useSelector((state) => state.User);
  const userDetails = user;
  console.log('Header user', user);

  //  const userDetails = user && JSON.parse(user);


  const menuData = CommonDetails.catMenu;
  const settingData = CommonDetails.setting;
  const totalCart = CommonDetails.total_cart;
  console.log('CommonDetails', CommonDetails);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchCommonData());
    }
  }, [dispatch, dataFetched, CommonDetails]);

  // cart details
  const { cartData } = useSelector(state => state.Cart);

  const { total_items, cart } = useSelector((state) => state.Cart);
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const items = JSON.parse(localStorage.getItem("cart"));
      dispatch(setCartItems(items));
    }
    dispatch(setProducts({ products: Products, fromHeader: true }));
  }, []);

  useEffect(() => {
    dispatch(setTotalItems());
  }, [cart, CommonDetails]);

  const router = useRouter();

  const logoutUser = () => {
    dispatch(logoutState());
    dispatch(clearCart())
    router.push("/login");
  };
  const isUserLoggedIn = userDetails && userDetails.id;

  // ---- ---- Const ---- ---- //
  let inputBox = document.querySelector(".input-box"),
    searchIcon = document.querySelector(".search"),
    closeIcon = document.querySelector(".close-icon");

  // // ---- ---- Open Input ---- ---- //
  // searchIcon.addEventListener('click', () => {
  // inputBox.classList.add('open');
  // });
  // // ---- ---- Close Input ---- ---- //
  // closeIcon.addEventListener('click', () => {
  // inputBox.classList.remove('open');
  // });

  const [isOpen, setIsOpen] = useState(false);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const searchIcon = document.querySelector(".search");
    const closeIcon = document.querySelector(".close-icon");

    if (searchIcon) {
      searchIcon.addEventListener("click", handleSearchClick);
    }

    if (closeIcon) {
      closeIcon.addEventListener("click", handleCloseClick);
    }

    return () => {
      if (searchIcon) {
        searchIcon.removeEventListener("click", handleSearchClick);
      }

      if (closeIcon) {
        closeIcon.removeEventListener("click", handleCloseClick);
      }
    };
  }, []);

  return (
    <>
      <div className="header-wrapper">
        <div className="top-header">
          <div className="container-fluid">
            <div className="row  d-flex align-items-center">
              <div className="col-4">
                {/* <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    IND
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        IND
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        IND
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        IND
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="col-4">
                <div className="header-logo">
                  <a href="/">
                    {settingData && (
                      <img
                        src={`${ImageBaseUrl}${settingData.logo}`}
                        alt="Ray Artwala"
                      />
                    )}
                  </a>
                </div>
              </div>

              <div className={userDetails ? 'col-4 input-search-wrapper loggedout' : 'col-4 input-search-wrapper'}>
                <div className={`input-box ${isOpen ? "open" : ""}`}>
                  <input
                    type="text"
                    placeholder="Search..."
                  />
                  {/* <span className="search"> */}
                  <span className='search'>
                    <img
                      src="/img/octicon_search-16.png"
                      alt="Search"
                    />
                  </span>
                  <i className="uil uil-times close-icon">
                    <img
                      src="/img/colse.png"
                      alt="Close"
                    />
                  </i>
                </div>
                <ul className='list-icons'>
                  <li>
                    <Link
                      href="/cart"
                      className={`position-relative me-4 my-auto ${totalCart && totalCart.length > 0
                        ? "cart-available"
                        : "empty-cart"
                        }`}>
                      <i className="fa fa-shopping-bag"></i>
                      <span
                        className={`position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1`}
                        style={{
                          top: "-5px",
                          left: "15px",
                          height: "20px",
                          minWidth: "20px",
                        }}>
                        {userDetails ? <> {cartData.length} </> : <></>}
                      </span>
                    </Link>
                  </li>
                  <li>
                    {userDetails ? (
                      <>
                        <Link
                          href="/profile"
                          className="my-auto">
                          <i className="fas fa-user "></i>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="my-auto">
                          <i className="fas fa-user "></i>
                        </Link>
                      </>
                    )}
                  </li>

                  <li>
                    {userDetails ? (
                      <>
                        <span
                          className="logout-btn"
                          onClick={logoutUser}>
                          <i className="fa fa-sign-out"></i>
                          Logout
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="bottom-header navbar navbar-expand-sm  navbar-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                  fill="#6A5B9C"
                />
              </svg>
            </button>
            <div
              className="collapse navbar-collapse"
              id="collapsibleNavbar">
              <ul className="navbar-nav">
                {/* Display the first five latest categories */}
                {menuData && menuData.length > 0
                  ? menuData.slice(0, 6).map((item, index) => (
                    <li
                      className="nav-item"
                      key={index}>
                      <Link
                        href={`/art-category/${item.category.slug}`}
                        className="nav-link active">
                        {item.category.name}
                      </Link>
                    </li>
                  ))
                  : ""}

                {menuData && menuData.length > 6 && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      More
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink">
                      {menuData.slice(6).map((item, index) => (
                        <li key={index}>
                          <Link
                            href={`/art-category/${item.category.slug}`}
                            className="dropdown-item">
                            {item.category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
