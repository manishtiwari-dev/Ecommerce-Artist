"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SellerRegister } from "../../services/auth/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import POST from "../../axios/post";
import { SellerRegisterUrl } from "../../config/index";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const index = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { user } = useSelector((state) => state.User);
  const userDetails = user;

  const [artworks, setArtworks] = useState([
    { id: 1, title: "", description: "", image: null, imageUrl: null },
    { id: 2, title: "", description: "", image: null, imageUrl: null },
    { id: 3, title: "", description: "", image: null, imageUrl: null },
    { id: 4, title: "", description: "", image: null, imageUrl: null },
    { id: 5, title: "", description: "", image: null, imageUrl: null },
  ]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (id, name, value) => {
    const updatedArtworks = artworks.map((artwork) =>
      artwork.id === id ? { ...artwork, [name]: value } : artwork
    );
    setArtworks(updatedArtworks);
  };

  const handleRemove = (id) => {
    setArtworks(artworks.filter((artwork) => artwork.id !== id));
  };

  const handleAddMore = () => {
    setArtworks([
      ...artworks,
      {
        id: Date.now(),
        title: "",
        description: "",
        image: null,
        imageUrl: null,
      },
    ]);
  };
  const handleImageUpload = (id, file) => {
    const updatedArtworks = artworks.map((artwork) =>
      artwork.id === id
        ? { ...artwork, image: file, imageUrl: URL.createObjectURL(file) }
        : artwork
    );
    setArtworks(updatedArtworks);
  };

  // const handleInputChange = (id, field, value) => {
  //   const updatedArtworks = artworks.map((artwork) =>
  //     artwork.id === id ? { ...artwork, [field]: value } : artwork
  //   );
  //   setArtworks(updatedArtworks);
  // };

  const [formloadingStatus, SetformloadingStatus] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    SetformloadingStatus(true);
    const saveFormData = { ...formData, artist_id: userDetails.id };

    const formDataToSend = new FormData();
    Object.keys(saveFormData).forEach((key) => {
      formDataToSend.append(key, saveFormData[key]);
    });
    // if (selectedFile) {
    //   formDataToSend.append("image", selectedFile);
    // }

    let imageArr = []
    artworks.map(art => imageArr.push(art.image));
    let filesNull = artworks.some(art => art.image === null)
    if (filesNull) return toast.error('Please upload 5 artworks')

    formDataToSend.append("sample_Image", selectedFile);


    try {
      const response = await POST(SellerRegisterUrl, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      SetformloadingStatus(false);
      if (response.status === 200) {
        toast.success(response.data.notification);
        router.push('/profile')
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

  console.log('userDetails', userDetails);
  console.log('artworks', artworks);

  return (
    <>
      <div className="artist-login-registeration-two  artist-login-registeration spaceingtop">
        <div className="container-fluid">
          <h1>ARTIST REGISTERATION</h1>

          <div className="row">
            <div className="Add-Artwork">
              <ul>
                <li className="Artist-Profile active">
                  <a href="#">
                    <span>1</span>
                    <h6>Artist Profile</h6>
                  </a>
                </li>
                <li className="Add-Artwork active">
                  <a href="#">
                    <span>2</span>
                    <h6>Add Artwork</h6>
                  </a>
                </li>
              </ul>
            </div>

            <div className="artist-login-registeration-inner">
              <div className="row">
                <h3>Add Your Latest Artwork</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className="row mb-4"
                  >
                    <h6>Add Artwork Image</h6>
                    {artworks.map((artwork, index) => (
                      <div className="col-md-2">
                        <div className="image-box">
                          <div className="add-artwork-box-wrapper">
                            <div
                              className="box"
                              onClick={() => document.getElementById(`imageInput-${artwork.id}`).click()}
                            >
                              {artwork.imageUrl ? (
                                <img
                                  src={artwork.imageUrl}
                                  alt="Artwork Preview"
                                  style={{ width: "100%", height: "auto" }}
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="35"
                                  height="34"
                                  viewBox="0 0 35 34"
                                  fill="none">
                                  <path
                                    d="M27.2372 18.422H18.8638V26.7954H16.0726V18.422H7.69922V15.6309H16.0726V7.25745H18.8638V15.6309H27.2372V18.422Z"
                                    fill="black"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <input
                            id={`imageInput-${artwork.id}`}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleImageUpload(artwork.id, e.target.files[0])
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <span>
                      File size should be minimum 2MB and Maximum 5MB
                    </span>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-right d-flex justify-content-end">
                      {/* <button
                        type="button"
                        className="btn btn-link addmoreBtn"
                        onClick={handleAddMore}>
                        Add More Artwork
                      </button> */}
                      <button
                        type="submit"
                        className="btn btn-link submitBtn">
                        Complete Registrations
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* 
              <h3>Add Your Latest Artwork</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {artworks.map((artwork, index) => (
                    <div
                      className="row mb-4"
                      key={artwork.id}>
                      <div className="col-md-2">
                        <div className="image-box">
                          <h6>Add Artwork Image</h6>
                          <div
                            className="box"
                            onClick={() => document.getElementById(`imageInput-${artwork.id}`).click()}>
                            {artwork.imageUrl ? (
                              <img
                                src={artwork.imageUrl}
                                alt="Artwork Preview"
                                style={{ width: "100%", height: "auto" }}
                              />
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="34"
                                viewBox="0 0 35 34"
                                fill="none">
                                <path
                                  d="M27.2372 18.422H18.8638V26.7954H16.0726V18.422H7.69922V15.6309H16.0726V7.25745H18.8638V15.6309H27.2372V18.422Z"
                                  fill="black"
                                />
                              </svg>
                            )}
                          </div>
                          <input
                            id={`imageInput-${artwork.id}`}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleImageUpload(artwork.id, e.target.files[0])
                            }
                          />
                          <span>
                            File size should be minimum 2MB and Maximum 5MB
                          </span>
                        </div>
                      </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
