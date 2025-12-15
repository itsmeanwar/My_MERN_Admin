import React, { useEffect, useState } from "react";
import useAuth from "../../Store/UseAuth";
import "./users.css";
import { toast, Bounce } from "react-toastify";
import {Link} from 'react-router-dom'

const Users = () => {
  const { token } = useAuth();
  const [state, setState] = useState([]);

  const delUser = async (id) => {
    const response = await fetch(
      `http://localhost:7000/api/admin/users/delete/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res_data = await response.json();
    if (response.ok) {
      getAllUsers();
      toast.success(res_data.msg, {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
        style: { fontSize: "13px" },
      });
    } else {
      toast.error(res_data, {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
        style: { fontSize: "13px" },
      });
    }
  };
  const getAllUsers = async () => {
    const response = await fetch(`http://localhost:7000/api/admin/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const res_data = await response.json();
    if (response.ok) {
      setState(res_data);
    } else {
      console.log("error", res_data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [token]);

  return (
    <div className="users-table-container">
      <h1>Users List</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {state.map((data, index) => (
            <tr key={data._id}>
              <td data-label="S.No">{index + 1}</td>
              <td data-label="Name">{data.name}</td>
              <td data-label="Email">{data.email}</td>
              <td data-label="Phone">{data.phone}</td>

             <div className="action-btns">
  <button className="btn-edit"><Link to={`/admin/users/${data._id}/edit`}>Edit</Link></button>
   <Link to={`/admin/users/404`}><button className="btn-update">404</button></Link> 
  <button
    className="btn-delete"
    onClick={() => delUser(data._id)}
  >
    Delete
  </button>
</div>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
