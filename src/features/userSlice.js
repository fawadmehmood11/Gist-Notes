import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  userDetails: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      //   console.log(action.payload);
      state.userDetails.push(action.payload);
    },

    userLogout: (state) => {
      console.log("User Logged Out");
    },
  },
});
export const selectUser = (state) => {
  console.log(state);
  return state.user.userDetails;
};

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
