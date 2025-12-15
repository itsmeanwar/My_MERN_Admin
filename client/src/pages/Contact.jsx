import React, { useState, useEffect } from "react";
// import "./Forms.css";
import { toast, Bounce } from "react-toastify";
import useAuth from "../Store/UseAuth";

const Contact = () => {
  const { user } = useAuth();
  const [state, setState] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (user?.name) setState({ name: user.name, email: user.email, message: "" });
  }, [user]);

  const handleInput = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/auth/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    const res_data = await response.json();

    try {
      if (response.ok) {
        toast.success(res_data.msg, { position: "top-right", autoClose: 3000, transition: Bounce, style: { fontSize: "13px" } });
        setState({ ...state, message: "" });
      } else {
        console.log(res_data)
        toast.error(res_data, { position: "top-right", autoClose: 3000, transition: Bounce, style: { fontSize: "13px" } });
      }
    } catch (error) {
      toast.warn(error.message, { position: "top-right", autoClose: 3000, transition: Bounce, style: { fontSize: "13px" } });
    }
  };

  return (
    <div className="contact">
      <div className="page-content">
        <form onSubmit={handleForm}>
          <h2>Contact Us</h2>

          <div className="input-area">
            <label>Name</label>
            <input type="text" placeholder="Enter name"  name="name" value={state.name} onChange={handleInput} autoComplete="off" />
          </div>

          <div className="input-area">
            <label>Email</label>
            <input type="text" placeholder="Enter email"  name="email" value={state.email} onChange={handleInput} autoComplete="off" />
          </div>

          <div className="input-area">
            <label>Message</label>
            <textarea placeholder="Enter your message"  name="message" value={state.message} onChange={handleInput} autoComplete="off" />
          </div>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
