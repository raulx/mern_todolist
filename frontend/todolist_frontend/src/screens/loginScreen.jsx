import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../store";
import { toast } from "react-toastify";
import Spinner from "../components/spinner";
export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [logIn, results] = useLogInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const typed = e.target.type;
    const valueTyped = e.target.value;

    if (typed === "email") {
      setLoginData((s) => {
        return { ...s, email: valueTyped };
      });
    } else if (typed === "password") {
      setLoginData((s) => {
        return { ...s, password: valueTyped };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email: loginData.email, password: loginData.password };
    try {
      const res = await logIn(user)
        .then((res) => res)
        .catch((err) => {
          return err;
        });
      console.log(res);
      if (res.data) {
        dispatch(loggedIn(res.data));
        navigate("/list");
        toast.success("Successfully Logged In", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else if (res.error) {
        let errorMessage;
        console.log(res.error);
        if (res.error.status === 401) {
          errorMessage = "Invalid Credentials !";
        } else {
          errorMessage = "Server Error,try later !";
        }
        toast.error(errorMessage, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        throw new Error(`Error:${errorMessage}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {results.isLoading ? (
        <Spinner />
      ) : (
        <div className="sign-in">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => handleChange(e)}
              value={loginData.email}
              name="email"
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
              value={loginData.password}
              name="password"
            />
            <button type="submit">Sign in</button>
          </form>
          <p>
            New Costumer? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      )}
    </>
  );
}
