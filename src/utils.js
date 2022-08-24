export const storeUser = (accessToken, userDetails) => {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

export const getAuthorizedUser = () => {
  const user = localStorage.getItem("userDetails");
  return user ? JSON.parse(user) : false;
};
