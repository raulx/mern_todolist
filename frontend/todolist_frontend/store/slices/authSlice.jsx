import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    loggedIn(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loggedOut(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    updateList(state, action) {
      state.userInfo = { ...state.userInfo, list: action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});

export const { loggedIn, loggedOut, updateList } = authSlice.actions;
export default authSlice.reducer;
