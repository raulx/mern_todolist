import {
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { toggleSlider } from "../../store/index";
import NavLink from "./navLink";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../../store";
import { toast } from "react-toastify";

export default function Navbar() {
  const showNav = useSelector((state) => {
    return state.slider;
  });

  const { userInfo } = useSelector((state) => {
    return state.auth;
  });

  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleClick = () => {
    dispatch(toggleSlider());
  };

  const handleLogout = () => {
    dispatch(loggedOut());
    toast.success("Successfully logged Out !", {
      autoClose: 2000,
      hideProgressBar: true,
    });
    logOut();
    Navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <span>Todo</span>list
        </div>
        <div className={`nav-items ${showNav ? "show-nav" : "hide-nav"}`}>
          {userInfo ? (
            <div className="profile">
              <NavLink
                text={"Home"}
                path={"/list"}
                icon={<FaHome style={{ fontSize: "2.4rem" }} />}
              />
              <NavLink text={"Profile"} path={"/profile"} icon={<FaUser />} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </div>
            </div>
          ) : (
            <>
              <NavLink
                text={"Sign In"}
                icon={<FaSignInAlt />}
                path={"/login"}
              />
              <NavLink
                text={"Sign Up"}
                icon={<FaSignOutAlt />}
                path={"/register"}
              />
            </>
          )}
        </div>
        <div className="toggle-bar" onClick={handleClick}>
          {showNav ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </>
  );
}
