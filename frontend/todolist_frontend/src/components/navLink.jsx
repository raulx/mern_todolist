/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { closeSlider } from "../../store";

export default function NavLink({ icon, text, path }) {
  const dispatch = useDispatch();

  const currentPath = useLocation();
  const isActive = currentPath.pathname === path ? true : false;
  const handleClick = () => {
    dispatch(closeSlider());
  };
  return (
    <div className={`nav-link ${isActive && "active"}`} onClick={handleClick}>
      {icon}
      <Link to={path}>{text}</Link>
    </div>
  );
}
