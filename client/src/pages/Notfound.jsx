import React from "react";
import { useNavigate } from "react-router-dom";
import "./Notfound.css";

const Notfound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p>
          The page you are looking for does not exist or has been moved.
        </p>
        <button className="btn-home" onClick={goHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Notfound;
