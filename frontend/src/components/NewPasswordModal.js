import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Spinner from "./Spinner";

const url = process.env.REACT_APP_BACKEND_PASSWORDS_URL;

const NewPasswordModal = (props) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const websiteRef = useRef();
  const titleRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const closeRef = useRef();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const passwordSubmitHandler = async (e) => {
    setIsLoading(true);
    setError(undefined);
    e.preventDefault();
    const data = {
      website: websiteRef.current.value,
      title: titleRef.current.value,
      userName: nameRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await fetch(`${url}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.error) {
      setError(responseData.error);
      setTimeout(() => {
        setError(undefined);
        setIsLoading(false);
      }, 1000);
      return;
    }
    if (!responseData.error) {
      props.newPassword(responseData);
      closeRef.current.click();
    }
  };

  const stateResetHandler = () => {
    setTimeout(() => {
      setError(undefined);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="newPasswordModal"
        tabIndex="-1"
        aria-labelledby="newPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newPasswordModalLabel">
                Save a new password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={stateResetHandler}
              ></button>
            </div>
            {error && (
              <div className="modal-body">
                <p>{error}</p>
              </div>
            )}
            {isLoading && (
              <div className="modal-body d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            )}
            {!error && !isLoading && (
              <form onSubmit={passwordSubmitHandler}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="website" className="form-label">
                      Website Url
                    </label>
                    <input
                      ref={websiteRef}
                      type="text"
                      className="form-control"
                      id="website"
                      placeholder="exampleWebsite.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      ref={titleRef}
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Enter the title"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Username
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Enter the username"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter the password"
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    ref={closeRef}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordModal;
