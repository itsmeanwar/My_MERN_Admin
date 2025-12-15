import React, { useState } from "react";
// import "./Forms.css";
import { toast, Bounce } from "react-toastify";
import useAuth from "../Store/UseAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { saveTLS } = useAuth();
  const [state, setState] = useState({ email: "", password: "" });

  const handleInput = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    const res_data = await response.json();

    try {
      if (response.ok) {
        saveTLS(res_data.token);
        toast.success(res_data.msg, { position: "top-right", autoClose: 3000, transition: Bounce, style: { fontSize: "13px" } });
        navigate("/");
      } else {
        console.log(res_data)
        toast.error(res_data, { position: "top-right", autoClose: 3000, transition: Bounce, style: { fontSize: "13px" } });
      }
    } catch (error) {
      toast.warn(error.message, { position: "top-right", autoClose: 3000, transition: Bounce, style: { fontSize: "13px" } });
    }
  };

  return (
    <div className="login">
      <div className="page-content">
        <form className="login-box" onSubmit={handleForm}>
          <h2 className="title">Login</h2>

          <div className="input-area">
            <label>Email</label>
            <input type="text" placeholder="Enter email"  name="email" value={state.email} onChange={handleInput} autoComplete="off" />
          </div>

          <div className="input-area">
            <label>Password</label>
            <input type="password" placeholder="Enter password" name="password" value={state.password} onChange={handleInput} autoComplete="off" />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
