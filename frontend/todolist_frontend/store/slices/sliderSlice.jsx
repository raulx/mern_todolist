import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: false,
  reducers: {
    toggleSlider(state) {
      return !state;
    },
    closeSlider() {
      return false;
    },
  },
});

export default sliderSlice.reducer;
export const { toggleSlider, closeSlider } = sliderSlice.actions;
