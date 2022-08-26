import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  starredGists: [],
  userGists: [],
  status: "idle",
  stat: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addStarredGists: (state, action) => {
      action.payload.map((data) => state.starredGists.push(data));
    },

    addUserGists: (state, action) => {
      action.payload.map((data) => state.userGists.push(data));
    },
  },
});
export const getStarredGists = (state) => {
  return state.user.starredGists;
};

export const getUserGists = (state) => {
  return state.user.userGists;
};

export const getStatus = (state) => state.user.status;

export const { addUserGists, addStarredGists } = userSlice.actions;
export default userSlice.reducer;
