"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { SellerRegisterUrl } from "../../services/auth/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import POST from "../../axios/post";
import { SellerRegisterUrl } from "../../config/index";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonData } from "../../redux/reducer/commonReducer";
import { setUserData } from '../../redux/reducer/userReducer';

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log('router', router);

  const { CommonDetails, loading, dataFetched } = useSelector(
    (state) => state.Common
  );
  if (typeof window === "undefined") {
    // This code will run on the server
    return null;
  }

  const countryData = CommonDetails.Country;
  const CityData = CommonDetails.City;
  const CountryStateData = CommonDetails.CountryState;

  // console.log(CountryStateData);

  useEffect(() => {
    dispatch(fetchCommonData());
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [formloadingStatus, SetformloadingStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    SetformloadingStatus(true);
    const saveFormData = { ...formData };

    const formDataToSend = new FormData();
    Object.keys(saveFormData).forEach((key) => {
      formDataToSend.append(key, saveFormData[key]);
    });
    if (selectedFile) {
      formDataToSend.append("profile_image", selectedFile);
    }

    console.log(formDataToSend);
    try {
      const response = await POST(SellerRegisterUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      SetformloadingStatus(false);
      if (response.status === 200) {
        // return console.log("response", response);
        dispatch(setUserData(response.data.datalist));
        router.push("/add-artwork");
        // toast.success(response.data.notification);
      } else {
        toast.error("Form submission failed");
      }
    } catch (error) {
      SetformloadingStatus(false);
      setLoading(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error("Error: " + error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setprofileDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <>
      <div className="artist-login-registeration spaceingtop">
        <div className="container-fluid">
          <h1>ARTIST REGISTERATION</h1>

          <div className="Add-Artwork">
            <ul>
              <li className="Artist-Profile active">
                <a href="#">
                  <span>1</span>
                  <h6>Artist Profile</h6>
                </a>
              </li>
              <li className="Add-Artwork">
                <a href="#">
                  <span>2</span>
                  <h6>Add Artwork</h6>
                </a>
              </li>
            </ul>
          </div>
          <div className="artist-login-registeration-inner">
            <div className="row">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-9">
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          placeholder="First Name"
                          {...register("first_name", {
                            required: "please enter a first  name",
                          })}
                        //onChange={handleChange}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage
                              errors={errors}
                              name="first_name"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          placeholder="Last Name"
                          name="name"
                          {...register("last_name", {
                            required: "please enter a last name",
                          })}
                        //onChange={handleChange}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage
                              errors={errors}
                              name="last_name"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="emailaddress@gmail.com"
                          {...register("email", {
                            required: "please enter a email",
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Invalid Email Address",
                            },
                          })}
                        // onChange={handleChange}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage
                              errors={errors}
                              name="email"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="number"
                          className="form-control"
                          id="tel"
                          placeholder="Contact"
                          {...register("phone", {
                            required: "please enter a phone",
                          })}
                        // onChange={handleChange}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage
                              errors={errors}
                              name="phone"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="Password"
                          placeholder="Password"
                          {...register("password", {
                            required: "please enter a password",
                          })}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage errors={errors} name="password" />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="Confirm-Password"
                          placeholder="Confirm Password"
                          // inputRef={register({ validate: value => value === getValues("password") || 'error message' })}
                          {...register("confirm-password", {
                            validate: value => value === getValues("password") || 'password does not match',
                            required: "please enter a confirm password",
                          })}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage errors={errors} name="confirm-password" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label className="form-label">D.O.B</label>
                        <input
                          type="date"
                          className="form-control"
                          id="birthday"
                          placeholder="India"
                          {...register("dob", {
                            required: "please select a dob",
                          })}
                        //  onChange={handleChange}
                        />
                        <div className="required">
                          <span>
                            <ErrorMessage
                              errors={errors}
                              name="dob"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <select
                          className="select__input "
                          {...register("country", {
                            required: "please select a country",
                          })}
                          id="country-selector1"
                        // onChange={handleChange}
                        >
                          <option value="0">Select Country</option>
                          {countryData &&
                            countryData.map((item) => (
                              <option
                                key={item.id}
                                value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        <div className="required">
                          <span>
                            <ErrorMessage
                              errors={errors}
                              name="country"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="profile-change-image">
                      <div className="image-box">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Profile Preview"
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="56"
                            height="56"
                            viewBox="0 0 56 56"
                            fill="none">
                            <path
                              d="M47.25 8.75H8.75C7.82174 8.75 6.9315 9.11875 6.27513 9.77513C5.61875 10.4315 5.25 11.3217 5.25 12.25V43.75C5.25 44.6783 5.61875 45.5685 6.27513 46.2249C6.9315 46.8812 7.82174 47.25 8.75 47.25H47.25C48.1783 47.25 49.0685 46.8812 49.7249 46.2249C50.3812 45.5685 50.75 44.6783 50.75 43.75V12.25C50.75 11.3217 50.3812 10.4315 49.7249 9.77513C49.0685 9.11875 48.1783 8.75 47.25 8.75ZM34.125 19.25C34.6442 19.25 35.1517 19.404 35.5834 19.6924C36.0151 19.9808 36.3515 20.3908 36.5502 20.8705C36.7489 21.3501 36.8008 21.8779 36.6996 22.3871C36.5983 22.8963 36.3483 23.364 35.9812 23.7312C35.614 24.0983 35.1463 24.3483 34.6371 24.4496C34.1279 24.5508 33.6001 24.4989 33.1205 24.3002C32.6408 24.1015 32.2308 23.765 31.9424 23.3334C31.654 22.9017 31.5 22.3942 31.5 21.875C31.5 21.1788 31.7766 20.5111 32.2688 20.0188C32.7611 19.5266 33.4288 19.25 34.125 19.25ZM47.25 43.75H8.75V35.1509L18.8869 25.0119C19.0494 24.8492 19.2424 24.7201 19.4549 24.632C19.6673 24.544 19.895 24.4986 20.125 24.4986C20.355 24.4986 20.5827 24.544 20.7951 24.632C21.0076 24.7201 21.2006 24.8492 21.3631 25.0119L36.0938 39.7381C36.4221 40.0665 36.8675 40.251 37.3319 40.251C37.7963 40.251 38.2416 40.0665 38.57 39.7381C38.8984 39.4098 39.0828 38.9644 39.0828 38.5C39.0828 38.0356 38.8984 37.5902 38.57 37.2619L34.7069 33.4009L37.8438 30.2619C38.1719 29.9339 38.6169 29.7497 39.0808 29.7497C39.5447 29.7497 39.9897 29.9339 40.3178 30.2619L47.25 37.2028V43.75Z"
                              fill="black"
                              fill-opacity="0.5"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() =>
                          document.getElementById("profilePicInput").click()
                        }>
                        Change Profile Picture
                      </span>
                      <input
                        type="file"
                        id="profilePicInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleProfilePicChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row mb-4">
                    <div className="col-md-12 d-flex flex-column">
                      <label className="form-label">Address</label>
                      <textarea
                        //   onChange={handleChange}
                        {...register("address")}
                        className="form-control"
                        placeholder="Address Here"
                        id="address"></textarea>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <select
                        className="select__input "
                        {...register("state", {
                          required: "please select a state",
                        })}
                        id="country-selector"
                      // onChange={handleChange}
                      >
                        <option value="0">State</option>

                        {CountryStateData &&
                          CountryStateData.map((item) => (
                            <option
                              key={item.id}
                              value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      <div className="required">
                        <span>
                          <ErrorMessage
                            errors={errors}
                            name="city"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">City</label>
                      <select
                        className="City "
                        {...register("city", {
                          required: "please select a city",
                        })}
                        id="country-selector2"
                      // onChange={handleChange}
                      >
                        <option value="0">City</option>
                        {CityData &&
                          CityData.map((item) => (
                            <option
                              key={item.id}
                              value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      <div className="required">
                        <span>
                          <ErrorMessage
                            errors={errors}
                            name="city"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Pincode/ZIP Code</label>
                      <input
                        type="number"
                        className="form-control"
                        id="tel"
                        placeholder="Pincode"
                        {...register("pincode")}
                      //  onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12 d-flex flex-column">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label">
                        Add Your Bio
                      </label>
                      <textarea
                        {...register("bio")}
                        //  onChange={handleChange}
                        className="form-control"
                        id=""
                        placeholder="Your Bio"></textarea>
                    </div>
                  </div>

                  <div className="button-wrap">
                    <button
                      type="submit"
                      className="btn btn-primary">
                      Save & Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
