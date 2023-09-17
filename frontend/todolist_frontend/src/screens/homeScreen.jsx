import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../store";
import { useDispatch } from "react-redux";
import { updateList } from "../../store";
import Spinner from "../components/spinner";
export default function HomeScreen() {
  const userInfo = localStorage.getItem("userInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetUserQuery();

  useEffect(() => {
    if (userInfo) {
      if (data) {
        dispatch(updateList(data.pendingTasks));
        navigate("/list");
      }
    }
  }, [data, dispatch, navigate, userInfo]);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="home-screen">
          <h1>
            <span>TODO</span>
            List
          </h1>
          <p>
            Welcome to TodoList <span> Now</span> schedule your work by managing
            a personalized
            <span> TodoList</span> in a <span>Safe and Secure</span>way,activate
            notification to get reminded of the pending tasks. complete all
            tasks in time and stay ahead of your peers.
          </p>
          <button className="btn-sign_in">
            <Link to={"/login"}>Sign In</Link>
          </button>
          <button className="btn-register">
            <Link to={"/register"}>Register</Link>
          </button>
        </div>
      )}
    </>
  );
}
