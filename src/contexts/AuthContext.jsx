import api from "@/lib/api";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [token, setToken] = useLocalStorage("jwt-taskify", null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      navigate("/auth/login", { replace: true });
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/user");
        setLoggedInUser(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
        navigate("/auth/login", { replace: true });
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(userData) {
    console.log(userData);
    try {
      const response = await api.post("/auth/auth/login", userData);
      setToken(response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async function register(userData) {
    console.log(userData);
    try {
      const response = await api.post("/auth/auth/register", userData);
      const { username, password } = userData;
      await login({ username, password });
    } catch (error) {
      console.error("Error registering:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loggedInUser, login, register, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
