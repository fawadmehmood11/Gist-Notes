import React from "react";
import { useEffect } from "react";
import { createAuthToken, getUserDetails } from "../apiCall";
import { storeToken } from "../utils";
import { Navigate } from "react-router-dom";

const Auth = () => {
  // https://jsonplaceholder.typicode.com/posts
  // https://github.com/login/oauth/access_token
  // https://cors-anywhere.herokuapp.com/
  // const TOKEN_URL = "https://jsonplaceholder.typicode.com/posts";
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

  // const getAuthToken = async () => {
  //   return await createAuthToken(TOKEN_URL, body, opts);
  // };

  // getAuthToken(TOKEN_URL, body, opts).then((res) => {
  //   console.log("response is", res);
  //   const getDetails = async () => {
  //     return await getUserDetails(res);
  //   };
  //   getDetails().then((result) => {
  //     console.log("Result is", result);
  //   });
  // });
  // getAuthToken().catch((error) => {
  // console.log(error);
  // });

  createAuthToken(TOKEN_URL, body, opts).then((res) => {
    console.log("checking res", res);
    if (res) {
      console.log("inside if");
      // axios
      //   .get("https://api.github.com/user", {
      //     headers: {
      //       Accept: "application/json",
      //       Authorization: `Bearer ${res}`,
      //     },
      //   })
      getUserDetails(res).then((response) => {
        console.log(response);
      });
    }
  });

  return <Navigate to="/" replace={true} />;
};

export default Auth;
