import React from "react";

const Login = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center p-4"
      style={{ height: "70vh" }}
    >
      <h2 className="text-center">Please login to save your passwords</h2>
      <form class="row g-3 border p-4 mt-4">
        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input type="email" class="form-control" id="inputEmail4" />
        </div>
        <div class="col-md-12">
          <label for="inputPassword4" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" id="inputPassword4" />
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
