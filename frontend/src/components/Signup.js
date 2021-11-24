import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";

const Signup = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const { signup, error, isLoading, isLoggedIn } = authCtx;

  const singUpHandler = (e) => {
    e.preventDefault();
    signup({
      name: nameRef.current.value,
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
      <h2 className="text-center">Please signup to save your passwords</h2>
      <form className="row g-3 border p-4 mt-4" onSubmit={singUpHandler}>
        <div className="col-md-12">
          <label htmlFor="inputName4" className="form-label">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            id="inputName4"
          />
        </div>
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
            Signup
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

export default Signup;
