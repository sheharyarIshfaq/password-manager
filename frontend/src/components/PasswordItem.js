import React from "react";

const PasswordItem = (props) => {
  return (
    <div class="card col-lg-auto">
      <div class="card-body">
        <div className="d-flex py-2 justify-content-start align-items-center">
          <img
            className="img-fluid w-64"
            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${props.website}`}
            alt=""
          />
          <p class="card-text mx-3">{props.website}</p>
        </div>
        <h5 class="card-title">{props.title}</h5>
        <div class="input-group input-group-sm my-3">
          <span class="input-group-text">User Name</span>
          <input
            type="text"
            aria-label="First name"
            class="form-control"
            value={props.userName}
            readOnly
          />
          <span class="input-group-text">
            <i class="far fa-copy"></i>
          </span>
        </div>
        <div class="input-group input-group-sm my-3">
          <span class="input-group-text">Password</span>
          <input
            type="text"
            aria-label="First name"
            class="form-control"
            value={props.password}
            readOnly
          />
          <span class="input-group-text">
            <i class="fas fa-eye-slash me-2"></i>
            <i class="fas fa-eye me-2"></i>
            <i class="far fa-copy"></i>
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
