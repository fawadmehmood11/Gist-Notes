import React from "react";
import { useEffect } from "react";
import { createAuthToken, getUserDetails } from "../apiCall";
import { storeUser, getAuthorizedUser } from "../utils";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/userSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";
const Auth = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const TOKEN_URL =
    "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token";
  let newUrl = "";

  const url = window.location.href;
  const hasCode = url.includes("?code=");

  if (hasCode) {
    newUrl = url.split("?code=");
  }

  const body = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    code: newUrl[1],
    redirectUrl: process.env.REACT_APP_REDIRECT_URI,
  };

  const opts = {
    headers: { accept: "application/json", "Access-Control-Allow-Origin": "*" },
  };

  useEffect(() => {
    if (!getAuthorizedUser()) {
      createAuthToken(TOKEN_URL, body, opts).then((token) => {
        if (token) {
          getUserDetails(token).then((response) => {
            storeUser(token, response);
            setIsLoaded(true);
            console.log("called auth effect");
          });
        }
      });
    }
  }, []);

  const Spinner = !isLoaded ? <LoadingSpinner /> : "";
  // console.log(Spinner);
  return (
    <>
      {Spinner}
      {isLoaded && <Navigate to="/" replace={true} />}
    </>
  );
};

export default Auth;
