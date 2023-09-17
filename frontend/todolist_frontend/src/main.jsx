import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import HomeScreen from "./screens/homeScreen.jsx";
import Login from "./screens/loginScreen.jsx";
import Register from "./screens/registerScreen.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/index.js";
import ListScreen from "./screens/listScreen.jsx";
import ProfileScreen from "./screens/profileScreen.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/", element: <HomeScreen /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/list", element: <ListScreen /> },
      { path: "/profile", element: <ProfileScreen /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
