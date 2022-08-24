import React from "react";
import { useEffect } from "react";
import { createAuthToken, getUserDetails } from "../apiCall";
import { storeUser, getAuthorizedUser } from "../utils";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/userSlice";

const Auth = () => {
  const dispatch = useDispatch();
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
        console.log("checking res", token);
        if (token) {
          // console.log("inside if");
          getUserDetails(token).then((response) => {
            // console.log(response);
            storeUser(token, response);

            // dispatch(userLogin(response));
          });
        }
      });
    }
  }, []);

  return <Navigate to="/" replace={true} />;
};

export default Auth;
