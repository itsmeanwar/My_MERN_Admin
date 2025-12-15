import { useEffect, useState } from "react";
import { AuthCreator } from "./Creator";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // track fetch status

  const saveTLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const removeToken = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token && !!user;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:7000/api/auth/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const res = await response.json();
          setUser(res);
        } else {
          removeToken(); // invalid token
        }
      } catch (err) {
        console.error(err);
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Don't render children until user fetch is complete
  if (loading) return null; // optionally show a spinner here

  return (
    <AuthCreator.Provider value={{ saveTLS, removeToken, isLoggedIn, user, token }}>
      {children}
    </AuthCreator.Provider>
  );
};
