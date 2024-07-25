"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { ContactMessageUrl } from "../../config";
import POST from "../../axios/post";
import { useRouter } from 'next/navigation';


const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();


  const [formloadingStatus, SetformloadingStatus] = useState(false);

  const onSubmit = async (formData) => {
    SetformloadingStatus(false);
    const saveFormData = formData;
    POST(ContactMessageUrl, saveFormData)
      .then((response) => {
        SetformloadingStatus(false);

        const { status, message } = response.data;

        if (response.status === 200) {
          toast.success("Message send successfully");
          router.push('/');
        } else {
          // Handle errors, e.g., show an error message
          toast.error("Form submission failed");
        }
      })
      .catch((error) => {
        SetformloadingStatus(false);
        if (error.response && error.response.data && error.response.data.notification) {
          toast.error("Error: " + error.response.data.notification); // Display the error message from the response
        } else {
          toast.error("An unexpected error occurred");
        }
      });
  };

  return (
    <>
      <div className="contact-wrapper form-information">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 ps-0 pr-3">
              <div className="image">
                <img src="img/contact-img.png" alt="" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-wrap">
                <div className="contact-form">
                  <h6>We’d love to here from you!</h6>
                  <h3>Contact</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="First Name"
                        {...register("first_name", {
                          required: "please enter a first name",
                        })}
                      />
                      <div>
                        <span>
                          <ErrorMessage errors={errors} name="first_name" />
                        </span>
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="Last Name"
                        {...register("last_name", {
                          required: "please enter a last name",
                        })}
                      />
                      <span>
                        <ErrorMessage errors={errors} name="last_name" />
                      </span>
                    </div>
                    <div className="input-wrap">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="E-mail"
                        {...register("email", {
                          required: "please enter a email",
                        })}
                      />

                      <span>
                        <ErrorMessage errors={errors} name="email" />
                      </span>
                    </div>
                    <div className="input-wrap">
                      <input
                        type="phone"
                        className="form-control"
                        id="phone"
                        placeholder="Phone Number"
                        {...register("phone", {
                          required: "please enter a phone number",
                        })}
                      />
                      <span>
                        <ErrorMessage errors={errors} name="phone" />
                      </span>
                    </div>
                    <div className="input-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        {...register("subject", {
                          required: "please enter a subject",
                        })}
                      />
                      <span>
                        <ErrorMessage errors={errors} name="subject" />
                      </span>
                    </div>
                    <div className="input-wrap">
                      <textarea
                        name="message"
                        className="form-control"
                        id="message"
                        placeholder="Leave a Message"
                        rows="10"
                        {...register("message")}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
