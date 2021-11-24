import React, { useEffect, useState } from "react";
import NewPasswordModal from "./NewPasswordModal";
import PasswordContainer from "./PasswordContainer";
import Spinner from "./Spinner";

const url = process.env.REACT_APP_BACKEND_PASSWORDS_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWI0NTUwNzQxNmE2YzhhODBhYjFhNiIsImlhdCI6MTYzNzc0NDk3MCwiZXhwIjoxNjM3NzQ4NTcwfQ.UXOBOjUB54Xb6R6gAyprjvmmZaKZ5Z-Uxq-Cse06DsY";

const SavedPassword = () => {
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPasswords = async () => {
      setIsLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSavedPasswords(data);
      setIsLoading(false);
      setError(data.error);
    };

    fetchPasswords();
  }, []);

  const newPasswordHandler = (newPassword) => {
    setSavedPasswords((prevPasswords) => prevPasswords.concat(newPassword));
  };

  return (
    <div className="container mt-4">
      <NewPasswordModal newPassword={newPasswordHandler} />
      {!error && (
        <div className="add-container d-lg-flex justify-content-around align-items-center">
          <h3 className="d-none d-lg-block">
            Click the Button to save a new password
          </h3>
          <button
            className="btn btn-primary mx-2 mx-lg-0"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#newPasswordModal"
          >
            Add a new password
          </button>
        </div>
      )}
      <div className="password-container">
        {isLoading && (
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            <Spinner />
          </div>
        )}
        {!savedPasswords ||
          (savedPasswords.length === 0 && !isLoading && (
            <div
              className="container d-flex justify-content-center align-items-center"
              style={{ height: "70vh" }}
            >
              <h1>No saved passwords found!</h1>
            </div>
          ))}
        {error && (
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            <h1>{error}</h1>
          </div>
        )}
        {savedPasswords && savedPasswords.length > 0 && (
          <PasswordContainer savedPasswords={savedPasswords} />
        )}
      </div>
    </div>
  );
};

export default SavedPassword;
