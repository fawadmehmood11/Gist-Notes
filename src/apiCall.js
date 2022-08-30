import axios from "axios";

const USER_URL = "https://api.github.com/user";
const PUBLIC_GISTS_URL = "https://api.github.com/gists/public";
const GIST_BY_ID_URL = "https://api.github.com/gists/";
const USER_GISTS_URL = "https://api.github.com/users/fawadmehmood11/gists";
const STARRED_GISTS_URL = "https://api.github.com/gists/starred";

export const createAuthToken = async (TOKEN_URL, body, opts) => {
  const response = await axios.post(TOKEN_URL, body, opts);
  if (response.status === 200) {
    return response.data["access_token"];
  }
};

export const getUserDetails = async (accessToken) => {
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

export const getUserGists = async (accessToken) => {
  const response = await axios.get(`${USER_GISTS_URL}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};

export const userStarredGists = async (accessToken) => {
  const response = await axios.get(STARRED_GISTS_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};

export const forkGist = async (gistId, accessToken) => {
  console.log(`https://api.github.com/gists/${gistId}/forks`);
  const response = await axios.post(
    `https://api.github.com/gists/${gistId}/forks`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(response);
  if (response.status === 201) {
    return response;
  }
};

export const starGist = async (gistId, accessToken) => {
  const response = await axios.put(
    `https://api.github.com/gists/${gistId}/star`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(response);
  if (response.status === 204) {
    return response;
  }
};

export const updateGist = async (gistId, data, accessToken) => {
  const response = await axios.patch(
    `https://api.github.com/gists/${gistId}`,
    data,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (response.status === 200) {
    return response;
  }
};
