import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import NewPasswordModal from "./NewPasswordModal";
import PasswordContainer from "./PasswordContainer";
import Spinner from "./Spinner";

const url = process.env.REACT_APP_BACKEND_PASSWORDS_URL;

const SavedPassword = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log(token);
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
  }, [token]);

  const newPasswordHandler = (newPassword) => {
    setSavedPasswords((prevPasswords) => prevPasswords.concat(newPassword));
  };

  const passwordDeleteHandler = async (id) => {
    setIsLoading(true);
    const response = await fetch(`${url}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (!responseData.error) {
      setSavedPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password.id !== id)
      );
    }
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
        {savedPasswords && savedPasswords.length > 0 && !isLoading && (
          <PasswordContainer
            onDelete={passwordDeleteHandler}
            savedPasswords={savedPasswords}
          />
        )}
      </div>
    </div>
  );
};

export default SavedPassword;
