import React from "react";
import { NavLink } from "react-router-dom";
import "./about.css";
import useAuth from "../Store/UseAuth";

const About = () => {
  const { user } = useAuth();

  return (
    <div className="about-container">
      <h2 className="about-title">About This Platform</h2>

      <h2 className="about-title">
        Hi <span className="highlight">{user?.name ? user.name : "Guest"}</span>, here’s what this platform offers:
      </h2>

      <div className="about-card neo-box">
        <p>
          This platform is designed to deliver a secure, clean, and user-friendly environment where
          you can easily explore services, manage your account, and stay updated with essential
          information.
        </p>

        <p>
          With a focus on responsiveness and simplicity, the system ensures consistent performance
          on all devices—whether you're browsing, managing your workflow, or accessing tools.
        </p>

        <p>
          We continuously enhance the platform with new features, performance improvements, and
          modern UI upgrades designed around your experience.
        </p>
      </div>

      {!user?.name && (
        <NavLink to="/login" className="start-btn neo-pressed">
          Get Started
        </NavLink>
      )}
    </div>
  );
};

export default About;
