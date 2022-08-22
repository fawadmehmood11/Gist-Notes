import axios from "axios";

const USER_URL = "https://api.github.com/user";
const PUBLIC_GISTS_URL = "https://api.github.com/gists/public";
const GIST_BY_ID_URL = "https://api.github.com/gists/";

export const createAuthToken = async (TOKEN_URL, body, opts) => {
  const response = await axios.post(TOKEN_URL, body, opts);
  if (response.status === 200) {
    // console.log(response);
    // return response;
    return response.data["access_token"];
  }
};

export const getUserDetails = async (accessToken) => {
  console.log("userDetails", accessToken);
  const response = await axios.get(USER_URL, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    // console.log(response.data);
    return response.data;
  }
};

export const getPublicGists = async () => {
  // console.log("publicGists", "getPublicGists");
  const response = await axios.get(PUBLIC_GISTS_URL, {
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};

export const getGistById = async (gistId) => {
  const response = await axios.get(`${GIST_BY_ID_URL}${gistId}`, {
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};

export const readGistCode = async (url) => {
  const response = await axios.get(url, {
    headers: {
      // Accept: "application/json",
      // Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
