import React, { useState } from "react";

const url = process.env.REACT_APP_BACKEND_USERS_URL;

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: undefined,
  login: (userData) => {},
  signup: (userData) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();

  const login = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.error) {
      setError(responseData.error);
      return;
    }
    setIsLoggedIn(true);
    setToken(responseData.token);
  };

  const signup = async (userData) => {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token,
        login: login,
        signup: signup,
        logout: logout,
        error: error,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
