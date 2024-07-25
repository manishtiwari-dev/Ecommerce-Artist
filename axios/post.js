// import React, { useState } from "react";
import axios from "axios";


async function POST(url, formdata) {
  if (localStorage.getItem("latitude") === undefined) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
      });
    }
  }
  const result = await axios.post(url, formdata);
  return result;
}

export default POST;
