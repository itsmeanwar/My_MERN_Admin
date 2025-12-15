import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./UpdateUser.css";
import useAuth from "../../Store/UseAuth";
import { toast, Bounce } from "react-toastify";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:7000/api/admin/users/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res_data = await response.json();
    if (response.ok) {
      console.log(res_data);
      setState({
        name: res_data.name,
        email: res_data.email,
        phone: res_data.phone,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:7000/api/admin/users/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
      }
    );
    const res_data = await response.json();
    if (response.ok) {
        console.log(res_data)
      toast.success(res_data.msg, {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
        style: { fontSize: "13px" },
      });
      setTimeout(() => {
        navigate("/admin/users");
      }, 1000);
    }
  };

  return (
    <div className="updateUser">
      <div className="page-content">
        <form className="update-box" onSubmit={handleForm}>
          <h1>Update User</h1>

          {/* NAME */}
          <div className="input-area">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={state.name}
              autoComplete="off"
              onChange={handleInput}
            />
          </div>

          {/* EMAIL */}
          <div className="input-area">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={state.email}
              autoComplete="off"
              onChange={handleInput}
            />
          </div>

          {/* PHONE */}
          <div className="input-area">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={state.phone}
              autoComplete="off"
              onChange={handleInput}
            />
          </div>

          <button type="submit">Update</button>
        </form>

        <Outlet />
      </div>
    </div>
  );
};

export default UpdateUser;
