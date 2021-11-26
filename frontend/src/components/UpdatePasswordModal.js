import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Spinner from "./Spinner";

const url = process.env.REACT_APP_BACKEND_PASSWORDS_URL;

const UpdatePasswordModal = (props) => {
  const tokenId = props.id;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const nameRef = useRef();
  const passwordRef = useRef();

  const closeRef = useRef();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updatePasswordHandler = async (e) => {
    setIsLoading(true);
    setError(undefined);
    e.preventDefault();
    const data = {
      userName: nameRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await fetch(`${url}/update/${tokenId}`, {
      method: "PATCH",
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
      props.updatePassword(responseData);
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
        id="updatePasswordModal"
        tabIndex="-1"
        aria-labelledby="updatePasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updatePasswordModalLabel">
                Update the password
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
              <form onSubmit={updatePasswordHandler}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="updateUserName" className="form-label">
                      Username
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      className="form-control"
                      id="updateUserName"
                      placeholder={props.userName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updatePassword" className="form-label">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      className="form-control"
                      id="updatePassword"
                      placeholder={props.password}
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
                    Update password
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

export default UpdatePasswordModal;
