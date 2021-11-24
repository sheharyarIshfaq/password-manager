import React from "react";

const Login = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center p-4"
      style={{ height: "70vh" }}
    >
      <h2 className="text-center">Please login to save your passwords</h2>
      <form className="row g-3 border p-4 mt-4">
        <div className="col-md-12">
          <label htmlhtmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-12">
          <label htmlhtmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
