"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutState } from "../../redux/reducer/userReducer";


const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //   /* logout function */
  const logout = () => {
    dispatch(logoutState());
    router.push('/login');

  };

  useEffect(() => {
    logout();
  }, []);

  return "";
};
export default index;
