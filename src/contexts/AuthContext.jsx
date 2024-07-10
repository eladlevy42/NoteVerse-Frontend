import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { useGoogleLogin } from "@react-oauth/google";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [token, setToken] = useLocalStorage("jwt-taskify", null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token == null) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/user");
        setLoggedInUser(response.data);

        // Show welcome toast if user is logged in and hasn't seen it yet
        const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
        if (!hasSeenWelcome) {
          toast({
            variant: "success",
            title: `Welcome Back ${response.data.firstName}!`,
          });
          sessionStorage.setItem("hasSeenWelcome", "true");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.error,
        });
        if (error.response?.status === 401 || error.response?.status === 404) {
          logout();
        }
        navigate("/auth/login", { replace: true });
      }
    }

    fetchUser();
  }, [token, navigate, toast]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
    sessionStorage.removeItem("hasSeenWelcome"); // Reset welcome message flag on logout
    toast({
      variant: "info",
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/", { replace: true });
  }

  async function login(userData) {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.error,
      });
    }
  }

  async function register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      const { username, password } = userData;
      await login({ username, password });
      toast({
        variant: "success",
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.error,
      });
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    const { credential } = credentialResponse;

    try {
      const response = await api.post("/google", {
        credential,
      });
      setToken(response.data.token);
      toast({
        variant: "success",
        title: "Connected",
        description: "Connected via Google!",
      });
      // Redirect to a protected route or perform other actions as needed
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response,
      });
    }
  }
  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        handleGoogleSuccess,
        login,
        register,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
