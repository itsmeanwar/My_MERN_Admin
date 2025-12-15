import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";
import useAuth from "../Store/UseAuth";

const Footer = () => {
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const footerRef = useRef(null);

  // Reveal on scroll
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailTrim = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);
    if (!valid) return alert("Please enter a valid email address.");

    console.log("Newsletter signup email:", emailTrim);
    setEmail("");
    toast.success("Thanks — we've received your email, We Will reach out you shortly.", { position: "top-right", autoClose: 5000, transition: 
Bounce, style: { fontSize: "13px" } });

    scrollTop();
  };

  const handleTop = () => scrollTop();

  return (
    <footer
      className={`footer ${revealed ? "reveal" : ""}`}
      ref={footerRef}
      role="contentinfo"
    >
      <div className="footer-container">
        {/* ABOUT */}
        <div className="footer-col">
          <h3>About</h3>
          <p>
            We build modern web experiences — UI, frontend & backend — focused
            on performance and accessibility. Reach out and let's build
            something great.
          </p>

          <div className="social-row" aria-label="Social links">
            <Link className="social-pill" to="#" aria-label="Facebook">
              <FaFacebookF />
            </Link>
            <Link className="social-pill" to="#" aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link className="social-pill" to="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </Link>
            <Link className="social-pill" to="#" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link className="social-pill" to="#" aria-label="YouTube">
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li><Link to="/" onClick={scrollTop}>Home</Link></li>
            <li><Link to="/service" onClick={scrollTop}>Services</Link></li>
            <li><Link to="/about" onClick={scrollTop}>About</Link></li>
            <li><Link to="/contact" onClick={scrollTop}>Contact</Link></li>
            {
              isLoggedIn ? (
 <li><Link to="/logout" onClick={scrollTop}>Logout</Link></li>
              ) : (
                <>
                 <li><Link to="/registration" onClick={scrollTop}>Register</Link></li>
            <li><Link to="/login" onClick={scrollTop}>Login</Link></li>
                </>
              )
            }
           
           
          </ul>
        </div>

        {/* MAP + NEWSLETTER */}
        <div className="footer-col">
          <h3>Find us</h3>

          <div className="map-container">
            <iframe
              title="office-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11524264954!2d72.741097656296!3d19.082197839801056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630fdf3f0f1%3A0x858dcd9a316bed36!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form className="newsletter" onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="pill-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <span>AnwarShaik.</span> All rights reserved.</p>

        <div className="footer-right">
          <button className="top-btn" onClick={handleTop}>
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
