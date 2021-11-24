import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const { login, error, isLoading, isLoggedIn } = authCtx;

  const loginHandler = (e) => {
    e.preventDefault();
    login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className="form-container container d-flex flex-column justify-content-center p-4"
      style={{ height: "70vh" }}
    >
      <h2 className="text-center">Please login to save your passwords</h2>
      <form className="row g-3 border p-4 mt-4" onSubmit={loginHandler}>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="inputEmail4"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="inputPassword4"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading ? true : false}
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Login
          </button>
        </div>
        {error && (
          <div className="col-12">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
