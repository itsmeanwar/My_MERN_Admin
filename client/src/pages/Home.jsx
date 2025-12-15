import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../Store/UseAuth";
const Home = () => {
const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2 className="welcome-title">
        {user?.name ?(
          <>
            👋Hi <span className="highlight">{user.name}</span>, Welcome!
          </>
        ) : (
          <>👋 Welcome <span className="highlight">Guest</span></>
        )}
      </h2>

      <p className="home-description">
        This portal helps you manage your account, explore available services, and stay
        updated with the latest features. Navigate through the dashboard to access
        registration, services, contact information, and more.
      </p>

      <div className="home-info-card">
        <h3>Why this platform?</h3>
        <p>
          We built this system to make your workflow simpler and faster. Everything you
          need — from profile management to service access — is organized in one place
          for your convenience.
        </p>
      </div>

      {/* Only show button for guests */}
      {!user && (
        <button
          className="start-btn"
          onClick={() => navigate("/login")}
          aria-label="Navigate to login page to get started"
        >
          Get Started →
        </button>
      )}
    </div>
  );
};

export default Home;
