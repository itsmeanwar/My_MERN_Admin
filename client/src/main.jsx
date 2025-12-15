import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
 import { ToastContainer} from 'react-toastify';
import { AuthProvider } from "./Store/Provider.jsx";
// apply saved theme immediately to prevent flash
const savedTheme = localStorage.getItem("theme") || "theme-dark";
document.body.className = savedTheme;

createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <StrictMode>
    <App />
     <ToastContainer />
  </StrictMode>
  </AuthProvider>
);
