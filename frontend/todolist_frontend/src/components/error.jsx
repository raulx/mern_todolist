/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function Error({ message, status }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="error-component">
      <h1>Oops !</h1>
      <h2>{status}</h2>
      <p>{message}</p>
      <button onClick={handleClick}>Go To HomePage</button>
    </div>
  );
}

export default Error;
