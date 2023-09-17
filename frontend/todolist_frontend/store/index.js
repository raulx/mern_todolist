import { configureStore } from "@reduxjs/toolkit";
import { toggleSlider, closeSlider } from "./slices/sliderSlice";
import { userApi } from "./apis/usersApi";
import {
  useLogInMutation,
  useRegisterUserMutation,
  useLogOutMutation,
} from "./apis/usersApi";
import { useAddItemMutation, useDeleteItemMutation } from "./apis/usersApi";
import sliderSlice from "./slices/sliderSlice";
import authSlice from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { loggedIn, loggedOut } from "./slices/authSlice";
const store = configureStore({
  reducer: {
    slider: sliderSlice,
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

setupListeners(store.dispatch);
export { toggleSlider, loggedIn, loggedOut, closeSlider };
export {
  useLogInMutation,
  useRegisterUserMutation,
  useLogOutMutation,
  useAddItemMutation,
  useDeleteItemMutation,
};
export default store;
