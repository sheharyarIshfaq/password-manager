import React from "react";
import Image from "../images/img1.svg";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="d-flex">
        <div className="content d-flex flex-column justify-content-center align-items-start p-5">
          <h1>Password Manager App</h1>
          <p>
            All your passwords at one place, login to any website with your
            saved passwords which are easily accessible
          </p>
          <div className="buttons-container">
            <button className="btn btn-outline-light">Login</button>
            <button className="btn btn-danger mx-3">Signup</button>
          </div>
        </div>
        <div className="img-container">
          <img src={Image} alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
