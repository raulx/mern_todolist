import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../store";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../store";
import Spinner from "../components/spinner";

export default function Register() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerUser, results] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValue.password != formValue.confirmPassword) {
      toast.error("Password do not match !.", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    } else {
      try {
        const user = {
          name: formValue.name,
          password: formValue.password,
          email: formValue.email,
        };
        const res = await registerUser(user)
          .then((res) => res)
          .catch((err) => err);
        console.log(res);
        if (res.data) {
          dispatch(loggedIn(res.data));
          navigate("/list");
          toast.success("Succesfull Registered !", {
            autoClose: 2000,
            hideProgressBar: true,
          });
        } else if (res.error) {
          const status = res.error.data.status;
          const message = res.error.data.message;
          if (status === 409) {
            toast.error(message, { autoClose: 2000, hideProgressBar: true });
          } else {
            toast.error("Internal Server Error !", {
              autoClose: 2000,
              hideProgressBar: true,
            });
          }
        }
      } catch (err) {
        toast.error("Error registering User!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log("Error: " + err);
      }
    }
  };
  return (
    <>
      {results.isLoading ? (
        <Spinner />
      ) : (
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <p>Name</p>
            <input
              type="text"
              placeholder="Enter Name"
              value={formValue.name}
              onChange={(e) => {
                setFormValue((s) => {
                  return { ...s, name: e.target.value };
                });
              }}
              name="name"
              autoComplete="on|off"
            />
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setFormValue((s) => {
                  return { ...s, email: e.target.value };
                });
              }}
              name="email"
              autoComplete="on|off"
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => {
                setFormValue((s) => {
                  return { ...s, password: e.target.value };
                });
              }}
              name="password"
              autoComplete="on|off"
            />
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm password"
              onChange={(e) => {
                setFormValue((s) => {
                  return { ...s, confirmPassword: e.target.value };
                });
              }}
              name="confirmPassword"
              autoComplete="on|off"
            />
            <button type="submit">Register</button>
          </form>
          <p>
            Already Registered? <Link to={"/login"}>login</Link>
          </p>
        </div>
      )}
    </>
  );
}
