import React from "react";

const PasswordItem = (props) => {
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
            type="text"
            aria-label="First name"
            className="form-control"
            value={props.userName}
            readOnly
          />
          <span className="input-group-text">
            <i className="far fa-copy"></i>
          </span>
        </div>
        <div className="input-group input-group-sm my-3">
          <span className="input-group-text">Password</span>
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            value={props.password}
            readOnly
          />
          <span className="input-group-text">
            <i className="fas fa-eye-slash me-2"></i>
            <i className="fas fa-eye me-2"></i>
            <i className="far fa-copy"></i>
          </span>
        </div>
        <div className="buttons-container">
          <button className="btn btn-sm btn-danger">Update</button>
          <button className="btn btn-sm btn-danger mx-2">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordItem;
