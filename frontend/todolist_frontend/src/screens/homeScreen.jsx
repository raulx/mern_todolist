import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function HomeScreen() {
  const { userInfo } = useSelector((state) => {
    return state.auth;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/list");
    }
  }, [navigate, userInfo]);
  return (
    <div className="home-screen">
      <h1>
        <span>TODO</span>
        List
      </h1>
      <p>
        Welcome to TodoList <span> Now</span> schedule your work by managing a
        personalized
        <span> TodoList</span> in a <span>Safe and Secure</span>way,activate
        notification to get reminded of the pending tasks. complete all tasks in
        time and stay ahead of your peers.
      </p>
      <button className="btn-sign_in">
        <Link to={"/login"}>Sign In</Link>
      </button>
      <button className="btn-register">
        <Link to={"/register"}>Register</Link>
      </button>
    </div>
  );
}
