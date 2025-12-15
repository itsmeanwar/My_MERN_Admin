import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";
import { HiUsers } from "react-icons/hi2";
import { FaMessage } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

const Admin = () => {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <NavLink to="./users"><HiUsers />&nbsp;Users</NavLink>
        <NavLink to="./contacts" style={{
          display:'flex',
          alignItems:"center"
        }}><FaMessage />&nbsp;Messages</NavLink>
        <NavLink to="./services"><MdOutlineMiscellaneousServices />&nbsp;Service Requests</NavLink>
      </nav>
   <Outlet />
      
     
      
    </div>
  );
};

export default Admin;
