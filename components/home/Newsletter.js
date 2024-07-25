"use client";
import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import POST from "../../axios/post";
import { SubscriberUrl } from "../../config/index";



const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formloadingStatus, SetformloadingStatus] = useState(false);

  const onSubmit = async (formData) => {
    SetformloadingStatus(false);
    const saveFormData = formData;
    POST(SubscriberUrl, saveFormData)
      .then((response) => {
        console.log(response);
        SetformloadingStatus(false);

        const { status, notification } = response.data;
   
        if (response.status === 200) {
          toast.success(" successfully");
          
           console.log(response.data.data);
        } else if (response.status === 402){
                
          toast.error("Error");
        }
      })
      .catch((error) => {
        SetformloadingStatus(false);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error("Error: " + error.response.data.message); // Display the error message from the response
        } 
        else {
          toast.error("A Timeout error occurred");
        }
      });
  };






  return (
    <>
      <section className="newsletter-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="heading">
              <h3>Looking For Art Beauty?</h3>
            </div>
            <div className="newsletter">
              <div className="box">
              <form onSubmit={handleSubmit(onSubmit)}>                  <p>
                    Don’t miss out on the latest art. Ray Artwala bring the
                    masterpieces to you!
                  </p>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                
                    {...register("email", {
                      required: "please enter a email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid Email Address",
                      },
                    })}
                  />
                  <div className="required">
                      <span>
                        <ErrorMessage errors={errors} name="email" />
                      </span>
                    </div>
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Newsletter;
