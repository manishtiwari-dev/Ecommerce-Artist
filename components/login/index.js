"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Login } from "../../services/auth/index";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import POST from "../../axios/post";
import { LoginUrl } from "../../config/index";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/reducer/userReducer';


const index = () => {
  const dispatch = useDispatch();
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


    POST(LoginUrl, saveFormData)
      .then((response) => {
        SetformloadingStatus(false);
        console.log('response', response);

        const { status, notification } = response.data;

        if (response.status === 200) {
          toast.success("Login successfully");
          router.push('/profile');
          // localStorage.setItem("loginDetails", JSON.stringify(response.data.data));
          dispatch(setUserData(response.data.data));

          console.log(response.data.data);
        } else if (response.status === 402) {

          // Handle errors, e.g., show an error message
          localStorage.setItem("loginDetails", null);
          toast.error("Error");
        }
      })
      .catch((error) => {
        console.log('error', error);
        SetformloadingStatus(false);
        localStorage.setItem("loginDetails", null);
        if (error.response && error.response.data && error.response.data.notification) {
          toast.error("Error: " + error.response.data.notification); // Display the error message from the response
        } else {
          toast.error("An unexpected error occurred");
        }
      });
  };



  return (
    <>
      <div className="login-wrapper  form-information">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 ps-0 pr-3">
              <div className="image">
                <img src="img/signup.png" alt="" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-wrap">
                <h3>LOG IN</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                      <span>
                        <ErrorMessage errors={errors} name="email" />
                      </span>
                    </div>

                  </div>
                  <div className="input-wrap">
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="Password"
                      {...register("password", {
                        required: "please enter a  password",
                      })}
                    />
                    <div>
                      <span>
                        <ErrorMessage errors={errors} name="password" />
                      </span>
                    </div>
                  </div>

                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      id="checkbox"
                      name="checkbox"
                      value="checkbox"
                    />
                    <div className="checkbox-text">
                      <label>Remember me</label>
                      <a href="#">Forgot password?</a>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </form>
                <p>Or Log In With</p>

                <ul className="icons">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="32"
                      viewBox="0 0 30 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_321_967)">
                        <path
                          d="M29.9857 16.4727C29.9857 15.2148 29.8836 14.2969 29.6627 13.345H15.2988V19.0225H23.7301C23.5602 20.4334 22.6423 22.5583 20.6024 23.9861L20.5738 24.1761L25.1154 27.6945L25.43 27.7259C28.3198 25.057 29.9857 21.1303 29.9857 16.4727Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M15.2988 31.4317C19.4295 31.4317 22.8971 30.0718 25.43 27.726L20.6024 23.9862C19.3105 24.8872 17.5766 25.5161 15.2988 25.5161C11.2532 25.5161 7.81945 22.8474 6.59543 19.1587L6.41602 19.1739L1.69359 22.8287L1.63184 23.0003C4.14762 27.9979 9.31523 31.4317 15.2988 31.4317Z"
                          fill="#34A853"
                        />
                        <path
                          d="M6.59543 19.1587C6.27246 18.2067 6.08555 17.1867 6.08555 16.1329C6.08555 15.0789 6.27246 14.059 6.57844 13.1071L6.56988 12.9044L1.78828 9.19092L1.63184 9.26533C0.594961 11.3392 0 13.6681 0 16.1329C0 18.5977 0.594961 20.9264 1.63184 23.0003L6.59543 19.1587Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M15.2988 6.74949C18.1716 6.74949 20.1094 7.99039 21.2143 9.02738L25.532 4.81168C22.8803 2.34687 19.4295 0.833984 15.2988 0.833984C9.31523 0.833984 4.14762 4.2677 1.63184 9.26527L6.57844 13.107C7.81945 9.41832 11.2532 6.74949 15.2988 6.74949Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_321_967">
                          <rect
                            width="30"
                            height="30.7031"
                            fill="white"
                            transform="translate(0 0.833984)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                    >
                      <path
                        d="M27.3399 1.96606H2.66255C1.81729 1.96606 1.13208 2.65128 1.13208 3.49653V28.1739C1.13208 29.0191 1.81729 29.7043 2.66255 29.7043H27.3399C28.1851 29.7043 28.8704 29.0191 28.8704 28.1739V3.49653C28.8704 2.65128 28.1851 1.96606 27.3399 1.96606Z"
                        fill="#3D5A98"
                      />
                      <path
                        d="M20.2687 29.7019V18.9604H23.8734L24.4125 14.7745H20.2687V12.1026C20.2687 10.8909 20.6062 10.0636 22.3429 10.0636H24.5601V6.31357C23.4865 6.20188 22.4075 6.14868 21.3281 6.1542C18.1359 6.1542 15.9375 8.09951 15.9375 11.6878V14.7745H12.3328V18.9604H15.9375V29.7019H20.2687Z"
                        fill="white"
                      />
                    </svg>
                  </li>
                </ul>
                <span>
                  Not a Collector Yet?<Link href="/sign-up">Sign Up</Link>
                </span>
                <span>
                  Showcase your Artist work? <Link href="/artist-sign-up">Register</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
