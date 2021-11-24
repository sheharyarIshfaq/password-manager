import React, { useEffect, useState } from "react";
import PasswordContainer from "./PasswordContainer";

const url = process.env.REACT_APP_BACKEND_PASSWORDS_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWI0NTUwNzQxNmE2YzhhODBhYjFhNiIsImlhdCI6MTYzNzcyOTA1MCwiZXhwIjoxNjM3NzMyNjUwfQ.-mSQllHXzpZfV6ZpLibBEFBmq_U9pQ0EYPsx6qrqiyY";

const SavedPassword = () => {
  const [savedPasswords, setSavedPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSavedPasswords(data);
    };

    fetchPasswords();
  }, []);

  return (
    <div className="container mt-4">
      <div className="add-container d-lg-flex justify-content-around align-items-center">
        <h3 className="d-none d-lg-block">
          Click the Button to save a new password
        </h3>
        <button className="btn btn-primary mx-2 mx-lg-0" type="button">
          Add a new password
        </button>
      </div>
      <div className="password-container">
        <PasswordContainer savedPasswords={savedPasswords} />
      </div>
    </div>
  );
};

export default SavedPassword;
