/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeSlider } from "../store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handler = () => {
      dispatch(closeSlider());
    };
    document.addEventListener("click", handler, true);

    return () => document.removeEventListener("click", handler);
  }, []);
  return (
    <div className="parent">
      <Navbar />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
