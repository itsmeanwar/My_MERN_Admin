import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa6";
import "./navbar.css";
import useAuth from "../Store/UseAuth";
import { FaHome } from "react-icons/fa";
import { MdRoundaboutRight } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineAppRegistration } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";


const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [hideNav, setHideNav] = useState(false);

  let lastScrollY = 0;

  // ✅ Auto hide navbar on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 830) {
        if (window.scrollY > lastScrollY) setHideNav(true);
        else setHideNav(false);

        lastScrollY = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Theme toggle (dark → light → gray)
  const toggleTheme = () => {
    if (theme === "dark") {
      document.body.className = "theme-light";
      setTheme("light");
    } else if (theme === "light") {
      document.body.className = "theme-gray";
      setTheme("gray");
    } else {
      document.body.className = "theme-dark";
      setTheme("dark");
    }
  };

  // ✅ Auto apply saved theme on load
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "theme-dark";
    document.body.className = saved;
    setTheme(saved.replace("theme-", ""));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", `theme-${theme}`);
  }, [theme]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={`navbar ${hideNav ? "hide-nav" : ""}`}>
        <div className="nav-logo">ANWAR</div>

        {/* ✅ Desktop Menu */}
        <nav className="nav-links">
          {user?.isAdmin === true ? (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "active" : "")}
            ><RiAdminFill />&nbsp;Admin
            </NavLink>
          ) : null}
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
          <FaHome />&nbsp;Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          ><MdRoundaboutRight />&nbsp;About
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) => (isActive ? "active" : "")}
          ><MdMiscellaneousServices />&nbsp;Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          ><IoCall />&nbsp;Contact
          </NavLink>
          {isLoggedIn ? (
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active" : "")}
            ><IoLogOut />&nbsp;Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/registration"
                className={({ isActive }) => (isActive ? "active" : "")}
              ><MdOutlineAppRegistration />&nbsp;Registration
              </NavLink>
              <NavLink to="/login" className="btn-login">
               <RiLoginBoxFill />&nbsp;Login
              </NavLink>
            </>
          )}
        </nav>

        {/* ✅ Theme icon (Desktop only) */}
        <div className="theme-icon" onClick={toggleTheme}>
          {theme === "dark" && <BsMoon />}
          {theme === "light" && <BsSun />}
          {theme === "gray" && <FaRegCircle />}
        </div>

        {/* ✅ Hamburger (mobile only) */}
        <div className="menu-btn" onClick={toggleMenu}>
          {isOpen ? <IoClose /> : <CiMenuBurger />}
        </div>
      </header>

      {/* ✅ MOBILE DRAWER MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {user?.isAdmin === true ? (
          <NavLink to="/admin" onClick={closeMenu}>
           <RiAdminFill />&nbsp;Admin
          </NavLink>
        ) : null}
        <NavLink to="/" onClick={closeMenu}>
            <FaHome />&nbsp;Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
         <MdRoundaboutRight />&nbsp;About
        </NavLink>
        <NavLink to="/service" onClick={closeMenu}>
         <MdMiscellaneousServices />&nbsp;Services
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
         <IoCall />&nbsp;Contact
        </NavLink>
        {isLoggedIn ? (
          <NavLink to="/logout" onClick={closeMenu}>
           <IoLogOut />&nbsp;Logout
          </NavLink>
        ) : (
          <>
            <NavLink to="/registration" onClick={closeMenu}>
           <MdOutlineAppRegistration />&nbsp;Registration
            </NavLink>
            <NavLink to="/login" onClick={closeMenu}>
             <RiLoginBoxFill />&nbsp;Login
            </NavLink>
          </>
        )}

        {/* ✅ Theme icon inside mobile drawer */}
        <div className="drawer-theme" onClick={toggleTheme}>
          {theme === "dark" && <BsMoon />}
          {theme === "light" && <BsSun />}
          {theme === "gray" && <FaRegCircle />}
        </div>
      </div>

      {/* ✅ Fade overlay behind drawer */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
