import React from "react";
import PasswordContainer from "./PasswordContainer";

const SavedPassword = () => {
  return (
    <div className="container mt-4">
      <div className="add-container d-lg-flex justify-content-around align-items-center">
        <h3 className="d-none d-lg-block">
          Click the Button to save a new password
        </h3>
        <button class="btn btn-primary mx-2 mx-lg-0" type="button">
          Add a new password
        </button>
      </div>
      <div className="password-container">
        <PasswordContainer />
      </div>
    </div>
  );
};

export default SavedPassword;
