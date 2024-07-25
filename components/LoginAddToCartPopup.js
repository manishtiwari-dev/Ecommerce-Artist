// components/Modal.js
import React from "react";
import { Button } from "react-bootstrap";

const LoginAddToCartPopup = ({ handleModalCartClose }) => {

  const close = () => {
    handleModalCartClose();
  };

  return (
    <>
    <div className="d-flex">
      <p className="fs-14 fw-500">
      Please LogIn / SignUp to use all the Cart features        
      <button className="btn fw-500  ml-20 modal-close-icon" onClick={() => close()}>X</button>
      </p>{" "}
      </div>
      <div className="modal-btn d-flex justify-content-end">
        <button
          className="btn btn-danger"
          onClick={() => (window.location.href = "/login")}
        >
          LogIn
        </button>
        <button
          className="goto-signup-btn ml-20"
          onClick={() => (window.location.href = "/signup")}
        >
          SignUp
        </button>
      </div>
    </>
  );
};

export default LoginAddToCartPopup;
