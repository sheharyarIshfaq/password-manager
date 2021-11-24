import React, { useState, useRef } from "react";

const PasswordItem = (props) => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [copyingName, setCopyingName] = useState(false);
  const [copyingPassword, setCopyingPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const copyUserNameHandler = () => {
    navigator.clipboard.writeText(userNameRef.current.value);
    setCopyingName(true);
    setTimeout(() => {
      setCopyingName(false);
    }, 1000);
  };

  const copyPasswordHandler = () => {
    navigator.clipboard.writeText(passwordRef.current.value);
    setCopyingPassword(true);
    setTimeout(() => {
      setCopyingPassword(false);
    }, 1000);
  };

  const passwordDeleteHandler = () => {
    console.log(props.id);
  };

  return (
    <div className="card col-lg-auto">
      <div className="card-body">
        <div className="d-flex py-2 justify-content-start align-items-center">
          <img
            className="img-fluid w-64"
            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${props.website}`}
            alt=""
          />
          <p className="card-text mx-3">{props.website}</p>
        </div>
        <h5 className="card-title">{props.title}</h5>
        <div className="input-group input-group-sm my-3">
          <span className="input-group-text">User Name</span>
          <input
            ref={userNameRef}
            type="text"
            aria-label="First name"
            className="form-control"
            value={copyingName ? "Copied to Clipboard" : props.userName}
            readOnly
          />
          <span className="input-group-text">
            <i
              className="far fa-copy"
              style={{ cursor: "pointer" }}
              onClick={copyUserNameHandler}
            ></i>
          </span>
        </div>
        <div className="input-group input-group-sm my-3">
          <span className="input-group-text">Password</span>
          <input
            ref={passwordRef}
            type={!showPassword && !copyingPassword ? "password" : "text"}
            aria-label="First name"
            className="form-control"
            value={copyingPassword ? "Copied to Clipboard" : props.password}
            readOnly
          />
          <span className="input-group-text">
            {showPassword && (
              <i
                className="fas fa-eye-slash me-2"
                style={{ cursor: "pointer" }}
                onClick={showPasswordHandler}
              ></i>
            )}
            {!showPassword && (
              <i
                className="fas fa-eye me-2"
                style={{ cursor: "pointer" }}
                onClick={showPasswordHandler}
              ></i>
            )}
            <i
              className="far fa-copy"
              style={{ cursor: "pointer" }}
              onClick={copyPasswordHandler}
            ></i>
          </span>
        </div>
        <div className="buttons-container">
          <button className="btn btn-sm btn-danger">Update</button>
          <button
            className="btn btn-sm btn-danger mx-2"
            onClick={passwordDeleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordItem;
