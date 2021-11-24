import React from "react";

const Signup = () => {
  return (
    <div
      className="form-container container d-flex flex-column justify-content-center p-4"
      style={{ height: "70vh" }}
    >
      <h2 className="text-center">Please signup to save your passwords</h2>
      <form className="row g-3 border p-4 mt-4">
        <div className="col-md-12">
          <label htmlFor="inputName4" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="inputName4" />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
