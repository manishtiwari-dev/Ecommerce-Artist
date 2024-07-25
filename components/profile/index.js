"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import POST from "../../axios/post";
import { ImageBaseUrl, ProfileUrl, UpdateProfileUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.User);
  const userDetails = user

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (event, tab) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  const [profileDetails, setprofileDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const [defaultprofileImage, setprofileImage] = useState(null);
  const [countryData, setCountry] = useState("");

  const [selectCountry, setSelectCountry] = useState("");

  const [isLoading, setLoading] = useState(true);


  const getData = async () => {
    if (!userDetails) return;
    setLoading(true);
    const filterData = {
      user_id: userDetails.id,
    };

    POST(ProfileUrl, filterData)
      .then((response) => {
        if (response.status === 200) {
          setprofileDetails(response.data.personInfo);
          setprofileImage(response.data.defaultProfile.image);
          setSelectCountry(response.data.Selectedcountries);
          setCountry(response.data.countries);
          setOrderDetails(response.data.orderDetails);

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
      })

      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [formloadingStatus, SetformloadingStatus] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true)
    SetformloadingStatus(true);
    const saveFormData = { ...formData, user_id: userDetails.id };

    const formDataToSend = new FormData();
    Object.keys(saveFormData).forEach((key) => {
      formDataToSend.append(key, saveFormData[key]);
    });
    if (selectedFile) {
      formDataToSend.append("image", selectedFile);
    }

    try {
      const response = await POST(UpdateProfileUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      SetformloadingStatus(false);
      if (response.status === 200) {
        toast.success(response.data.notification);
      } else {
        toast.error("Form submission failed");
      }
    } catch (error) {
      SetformloadingStatus(false);
      setLoading(false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.notification
      ) {
        toast.error("Error: " + error.response.data.notification);
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('e', name, value);
    setprofileDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  if (isLoading || !profileDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="profile-wrapper spaceingtop">
        <div className="container-fluid">
          <div className="row">
            <h3>Hello {profileDetails?.name}</h3>
            <div className="tabber-wrapper">
              <div className="tabber">
                <ul className="tabber-list">
                  <li>
                    <a href="#tab1" onClick={(e) => handleTabClick(e, "tab1")}>
                      Profile Details
                    </a>
                  </li>
                  <li>
                    <a href="#tab2" onClick={(e) => handleTabClick(e, "tab2")}>
                      Order History
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tabber-content-wrapper">
                {activeTab === "tab1" && (
                  <div className="tabber-content" id="tab1">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="profile-wrap">
                          <img
                            src={
                              profileDetails && profileDetails.image
                                ? `${ImageBaseUrl}${profileDetails.image}`
                                : "/img/avatar.png"
                            }
                            alt={profileDetails && profileDetails.name}
                          />
                          <h5>{profileDetails && profileDetails.name}</h5>
                          <span
                            onClick={() =>
                              document.getElementById("profilePicInput").click()
                            }
                          >
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
                      <div className="col-md-8">
                        <div className="form-wrap">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-wrap">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="User Name"
                                {...register("name", {
                                  required: "please enter a name",
                                })}
                                value={profileDetails && profileDetails.name}
                                onChange={handleChange}
                              />
                              <div className="required">
                                <span>
                                  <ErrorMessage errors={errors} name="name" />
                                </span>
                              </div>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                {...register("email", {
                                  required: "please enter a email",
                                })}
                                value={profileDetails && profileDetails.email}
                                onChange={handleChange}
                              />
                              <div className="required">
                                <span>
                                  <ErrorMessage errors={errors} name="email" />
                                </span>
                              </div>
                            </div>
                            <div className="input-wrap">

                              <select
                                className="select__input form-control"
                                {...register("country", {
                                  required: "please select a country",
                                })}
                                id="country-selector"
                                defaultValue={profileDetails && profileDetails.country_id}
                                onChange={handleChange}
                              >
                                <option value="0">Select Country</option>

                                {countryData && countryData.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>



                              <input
                                type="tel"
                                className="form-control"
                                id="number"
                                placeholder="Contact No."
                                {...register("phone", {
                                  required: "please enter a phone",
                                })}
                                value={profileDetails && profileDetails.phone}
                                onChange={handleChange}
                              />
                              <div className="required">
                                <span>
                                  <ErrorMessage errors={errors} name="phone" />
                                </span>
                              </div>
                            </div>
                            <div className="input-wrap">
                              <textarea
                                name="address"
                                placeholder="Address"
                                className="form-control"
                                id="address"
                                rows="5"
                                {...register("address")}
                                value={profileDetails && profileDetails.address}
                                onChange={handleChange}
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Update Profile
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div className="tabber-content" id="tab2">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="profile-wrap">
                          <img src="img/user.png" alt="" />
                          <h5>User Name</h5>
                          <span>Change Profile Picture</span>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-wrap">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-wrap mb-3">
                              <input
                                type="text"
                                className="form-control mt-2"
                                id="cardHolderName"
                                placeholder="Card Holder Name"
                                name="cardHolderName"
                              />
                              <input
                                type="text"
                                className="form-control mt-2"
                                id="cardNum"
                                placeholder="Card Number"
                                name="cardNum"
                              />
                            </div>
                            <div className="input-wrap mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="bankname"
                                placeholder="Bank Name"
                                name="bankname"
                              />
                              <input
                                type="text"
                                className="form-control"
                                id="ifsc"
                                placeholder="IFSC Code"
                                name="ifsc"
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Change Account
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
