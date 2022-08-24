export const storeUser = (accessToken, userDetails) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

export const getAuthorizedUser = () => {
  const user = localStorage.getItem("userDetails");
  console.log("isUser", user);
  return user ? JSON.parse(user) : false;
};

export const logOutUser = () => {
  if (localStorage.getItem("userDetails")) {
    console.log("Logging Out");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
  }
};
