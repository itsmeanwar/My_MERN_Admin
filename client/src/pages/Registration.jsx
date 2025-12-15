import React, { useState } from "react";
// import "./Forms.css";
import { toast, Bounce } from "react-toastify";
import useAuth from "../Store/UseAuth";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const { saveTLS } = useAuth();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:7000/api/auth/registration",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }
    );

    const res_data = await response.json();

    try {
      if (response.ok) {
        saveTLS(res_data.token);
        toast.success(res_data.msg, {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
          style: { fontSize: "13px" },
        });
        navigate("/");
      } else {
        
        toast.error(res_data.msg, {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
          style: { fontSize: "13px" },
        });
      }
    } catch (error) {
      toast.warn(error.message, {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
        style: { fontSize: "13px" },
      });
    }
  };

  return (
    <div className="registration">
      <div className="page-content">
        <form onSubmit={handleForm}>
          <h2>Registration</h2>

          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={state.name}
              onChange={handleInput}
              id="name"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              value={state.email}
              onChange={handleInput}
              id="email"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={state.password}
              onChange={handleInput}
              id="password"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              placeholder="Enter phone"
              name="phone"
              value={state.phone}
              onChange={handleInput}
              id="phone"
              autoComplete="off"
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
