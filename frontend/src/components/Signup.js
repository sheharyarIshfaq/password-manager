import React from "react";

const Signup = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center p-4"
      style={{ height: "70vh" }}
    >
      <h2 className="text-center">Please signup to save your passwords</h2>
      <form class="row g-3 border p-4 mt-4">
        <div class="col-md-12">
          <label for="inputName4" class="form-label">
            Name
          </label>
          <input type="text" class="form-control" id="inputName4" />
        </div>
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
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
