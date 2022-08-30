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
      state.starredGists = [];
      action.payload.map((data) => state.starredGists.push(data));
    },

    addUserGists: (state, action) => {
      state.userGists = [];
      action.payload.map((data) => {
        state.userGists.push(data);
      });
    },
  },
});
export const getStarredGists = (state) => {
  return state.user.starredGists;
};

export const getUserGists = (state) => {
  return state.user.userGists;
};

export const getGistById = (state, gistId) => {
  return state.user.userGists.find((gist) => gist.id === gistId);
};

export const getStatus = (state) => state.user.status;

export const { addUserGists, addStarredGists } = userSlice.actions;
export default userSlice.reducer;
