import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [autoUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(false);

  const value = {
    autoUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    setIsAdmin,
    userId,
    setUserId,
  };

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://localhost:5000/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("userId", response.data.user.id);
          sessionStorage.setItem("isAdmin", response.data.user.isAdmin);
          const userId = sessionStorage.getItem("userId");
          const isAdmin = sessionStorage.getItem("isAdmin");
          if (userId) {
            setUserId(userId);
          }
          if (isAdmin) {
            setIsAdmin(true);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
