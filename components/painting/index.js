"use client";
import React, { useEffect, useState } from "react";
import { ImageBaseUrl, SearchProductUrl,ProductUrl } from "../../config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const index = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isCollapsedSix, setIsCollapsedSix] = useState(true);
  const toggleCollapseSix = (event) => {
    event.preventDefault();
    setIsCollapsedSix(!isCollapsedSix);
  };

  const [isCollapsedSeven, setIsCollapsedSeven] = useState(true);
  const toggleCollapseSeven = (event) => {
    event.preventDefault();
    setIsCollapsedSeven(!isCollapsedSeven);
  };

  const [widthRangeValue, setWidthRangeValue] = useState(100);
  const [heightRangeValue, setHeightRangeValue] = useState(100);
  // Function to handle width range input change
  const handleWidthRangeChange = (event) => {
    setWidthRangeValue(event.target.value);
  };

  // Function to handle height range input change
  const handleHeightRangeChange = (event) => {
    setHeightRangeValue(event.target.value);
  };
 // Function to handle unit toggle between cm and inches
 const [unit, setUnit] = useState("cm"); // Initial unit
 const handleUnitToggle = (clickedUnit) => {
  setUnit(clickedUnit);
};

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ProductUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

 // console.log(data);

 


  // const onSubmit = async (formData) => {
  //   const saveFormData = formData;
  //   // console.log(saveFormData); 
  // //  e.preventDefault();
  //   try {
  //     // Make an API call or perform any necessary actions with the form data
    
  //     const queryString = new URLSearchParams(formData).toString();
  //     // Append the query string to the endpoint URL
  //     const urlWithParams = `${SearchProductUrl}?${queryString}`;
  //     // Make a GET request to search products with the constructed URL
  //     const response = await fetch(urlWithParams);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setData(data);
  //       console.log(data); // Log the response data
  //     } else {
  //       // Handle errors, e.g., show an error message
  //       toast.error("Form submission failed");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error submitting form:", error);
  //   }
  // };


  const onSubmit = async (formData) => {
    try {
        const response = await fetch(SearchProductUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(formData), // Convert form data to JSON string
        });

        if (response.ok) {
            const data = await response.json();
            setData(data);
            console.log(data); // Log the response data
        } else {
            // Handle errors, e.g., show an error message
            toast.error("Form submission failed");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form");
    }
};


  return (
    <>
      <div className="section listing">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="col-left">
                <h1>Painting</h1>
                <div className="filter-box">
                  <button type="button" className="btn btn-link closeBtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8.46399 15.5348L15.536 8.46484M8.46399 8.46484L15.536 15.5348"
                        stroke="#6A5B9C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </button>

                  <div id="accordion" className="box">
                    <div className="card">
                      <div className="card-header">
                        <a
                          className="btn"
                          data-bs-toggle="collapse"
                          href="#collapseOne"
                        >
                          Price
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8.46399 15.5348L15.536 8.46484M8.46399 8.46484L15.536 15.5348"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Min."
                              {...register("min_price")}
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Max."
                              {...register("max_price")}
                            />
                          </div>
                          <div className="range-input">
                            <input type="range" className="range" />
                          </div>
                          <div className="price-wrap">
                            <span>₹ 1k</span>
                            <span>₹ 90K</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          data-bs-toggle="collapse"
                          href="#collapseTwo"
                        >
                          Orientation
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8.46399 15.5348L15.536 8.46484M8.46399 8.46484L15.536 15.5348"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse show"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="checkbox-wrap">
                            <div className="box">
                              <span>Horizontal</span>
                            </div>
                            <div className="box">
                              <span>Vertical</span>
                            </div>
                            <div className="box">
                              <span>Square</span>
                            </div>
                            <div className="box">
                              <span>Panoramic</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          data-bs-toggle="collapse"
                          href="#collapseFour"
                        >
                          Size
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8.46399 15.5348L15.536 8.46484M8.46399 8.46484L15.536 15.5348"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse show"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="size-wrap">
                            <div className="btn-group">
                              <button
                                type="button"
                                className={`btn btn-link ${
                                  unit === "cm" ? "active" : ""
                                }`}
                                onClick={() => handleUnitToggle("cm")}
                              >
                                Cm
                              </button>
                              <button
                                type="button"
                                className={`btn btn-link ${
                                  unit === "inches" ? "active" : ""
                                }`}
                                onClick={() => handleUnitToggle("inches")}
                              >
                                Inches
                              </button>
                            </div>

                            <div className="range-input widthrange">
                              <h4>Width Range</h4>
                              <input
                                type="range"
                                className="range"
                                // {...register("width_range")}
                                value={widthRangeValue}
                                onChange={handleWidthRangeChange}
                                min="100" // Set the minimum value
                                max="500" // Set the maximum value
                                step="1" // Set the step value
                              />
                            </div>
                            <div className="price-wrap rangesize">
                              <span>100</span>
                              <span>500</span>
                            </div>

                            <div className="range-input heightrange">
                              <h4>Height Range</h4>
                              <input
                                type="range"
                                className="range" 
                                // {...register("height_range")}
                                value={heightRangeValue}
                                onChange={handleHeightRangeChange}
                                min="100" // Set the minimum value
                                max="500" // Set the maximum value
                                step="1" // Set the step value
                              />
                            </div>
                            <div className="price-wrap rangesize">
                              <span>100</span>
                              <span>500</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          data-bs-toggle="collapse"
                          href="#collapseThree"
                        >
                          Style
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8.46399 15.5348L15.536 8.46484M8.46399 8.46484L15.536 15.5348"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse show"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className="checkbox-menu">
                            <ul>
                              <li>
                                <a href="#">
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value="checkbox"
                                  />
                                  <span>Acrylic</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value="checkbox"
                                  />
                                  <span>Collage</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value="checkbox"
                                  />
                                  <span>Fancy</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value="checkbox"
                                  />
                                  <span>Elegant</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value="checkbox"
                                  />
                                  <span>Water Color</span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value="checkbox"
                                  />
                                  <span>Fantasy</span>
                                </a>
                              </li>
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
                          href="#collapseFive"
                        >
                          Color
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8.46399 15.5348L15.536 8.46484M8.46399 8.46484L15.536 15.5348"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseFive"
                        className="collapse show"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body"></div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          onClick={(e) => toggleCollapseSix(e)}
                          data-bs-toggle="collapse"
                          href="#collapseSix"
                        >
                          Medium
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="35"
                            viewBox="0 0 34 35"
                            fill="none"
                          >
                            <path
                              d="M16.9698 22.8825L16.9712 12.8826M11.9706 17.8833L21.9705 17.8819"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseSix"
                        className={`collapse ${isCollapsedSix ? "" : "show"}`}
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <a
                          className="collapsed btn"
                          data-bs-toggle="collapse"
                          href="#collapseSeven"
                          onClick={(e) => toggleCollapseSeven(e)}
                        >
                          Artist
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="35"
                            viewBox="0 0 34 35"
                            fill="none"
                          >
                            <path
                              d="M16.9698 22.8825L16.9712 12.8826M11.9706 17.8833L21.9705 17.8819"
                              stroke="#6A5B9C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div
                        id="collapseSeven"
                        data-bs-parent="#accordion"
                        className={`collapse ${isCollapsedSeven ? "" : "show"}`}
                      >
                        <div className="card-body">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </div>
                      </div>
                    </div>

                    <button  type="submit" className="btn btn-link applyBtn">
                      APPLY
                    </button>
                  </div>
                </div>
              </div>

              {/* <button type="button" className="btn btn-link filterBtn">
                Filter{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="35"
                  viewBox="0 0 34 35"
                  fill="none"
                >
                  <path
                    d="M16.9698 22.8825L16.9712 12.8826M11.9706 17.8833L21.9705 17.8819"
                    stroke="#6A5B9C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </button> */}

              </form>

            </div>

            <div className="col-md-9">
              <section className="Latest-collections desktop-lastest-collections">
                <div className="container-fluid">
                  <div className="dropdown sortby">
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Sort By
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <path
                          d="M1.12463 3.63906C1.25356 3.51017 1.42839 3.43777 1.61069 3.43777C1.79299 3.43777 1.96783 3.51017 2.09676 3.63906L5.49988 7.04218L8.90301 3.63906C9.03267 3.51382 9.20633 3.44453 9.38659 3.44609C9.56685 3.44766 9.73929 3.51996 9.86676 3.64743C9.99422 3.7749 10.0665 3.94733 10.0681 4.12759C10.0697 4.30785 10.0004 4.48152 9.87513 4.61118L5.98594 8.50037C5.85702 8.62926 5.68218 8.70166 5.49988 8.70166C5.31758 8.70166 5.14274 8.62926 5.01382 8.50037L1.12463 4.61118C0.995744 4.48226 0.92334 4.30742 0.92334 4.12512C0.92334 3.94282 0.995744 3.76798 1.12463 3.63906Z"
                          fill="black"
                          fill-opacity="0.6"
                        />
                      </svg>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Sort By
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Sort By
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Sort By
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    {data && data.products.data.length > 0 ? (
                      data.products.data.map((item, index) => (
                        <div className="column">
                          <div className="imasonry-items">
                            <div className="image">
                              <img
                                src={`${ImageBaseUrl}${item.thumb_image}`}
                                alt=""
                              />
                            </div>
                            <div className="content">
                              <div className="col-left">
                             {/* <h5>{item.short_description.length > 50 ? `${item.short_description.slice(0, 50)}...` : item.short_description}</h5> */}
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
                        </div>
                      ))
                    ) : (
                      <h4>No Products...</h4>
                    )}
                  </div>
                </div>
              </section>

              {/* <section className="Latest-collections mobile-lastest-collections">
                <div className="container-fluid">
                  <div className="row">
                    <h3>Latest Collections</h3>
                    <div className="column">
                      <a href="#">
                        <div className="imasonry-items">
                          <div className="image">
                            <img
                              src="img/item17.png"
                              alt=""
                            />
                          </div>
                          <div className="content">
                            <div className="col-left">
                              <h5>The life view</h5>
                              <span>Painting</span>
                              <h6>70X20 In</h6>
                            </div>
                            <div className="col-right">
                              <div className="icon">
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
                              <span className="price">₹61,000</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-link viewBtn">
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-link addBtn">
                            Add to cart
                          </button>
                          <hr />
                        </div>
                      </a>
                      <a href="#">
                        <div className="imasonry-items">
                          <div className="image">
                            <img
                              src="img/item18.png"
                              alt=""
                            />
                          </div>
                          <div className="content">
                            <div className="col-left">
                              <h5>Majestic Deer</h5>
                              <span>Digital Art</span>
                              <h6>303X202 In</h6>
                            </div>
                            <div className="col-right">
                              <div className="icon">
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
                              <span className="price">₹61,000</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-link viewBtn">
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-link addBtn">
                            Add to cart
                          </button>
                          <hr />
                        </div>
                      </a>
                    </div>
                    <div className="column">
                      <a href="#">
                        <div className="imasonry-items">
                          <div className="image">
                            <img
                              src="img/item20.png"
                              alt=""
                            />
                          </div>
                          <div className="content">
                            <div className="col-left">
                              <h5>Colored Roof</h5>
                              <span>Abstract</span>
                              <h6>303X354 In</h6>
                            </div>
                            <div className="col-right">
                              <div className="icon">
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
                              <span className="price">₹61,000</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-link viewBtn">
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-link addBtn">
                            Add to cart
                          </button>
                          <hr />
                        </div>
                      </a>

                      <a href="#">
                        <div className="imasonry-items">
                          <div className="image">
                            <img
                              src="img/item19.png"
                              alt=""
                            />
                          </div>
                          <div className="content">
                            <div className="col-left">
                              <h5>Women Power</h5>
                              <span>Painting</span>
                              <h6>304X382 In</h6>
                            </div>
                            <div className="col-right">
                              <div className="icon">
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
                              <span className="price">₹61,000</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-link viewBtn">
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-link addBtn">
                            Add to cart
                          </button>
                          <hr />
                        </div>
                      </a>
                    </div>

                    <div className="btn-viewAll">
                      <button
                        type="button"
                        className="btn btn-link artBtn">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              </section> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
