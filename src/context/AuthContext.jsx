// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // optional, nicht zwingend

  useEffect(() => {
    const checkAuth = async () => {
  console.log("Checking auth...");

  try {
    const res = await axiosInstance.post("/auth/is-auth", {}, { withCredentials: true });
    console.log("Auth successful, user:", JSON.stringify(res.data.user, null, 2));

    console.log("Auth check response:", res.data);
    console.log("Cookies:", document.cookie); // Check if cookies are present
    
    if (res.data.success) {
      console.log("Auth successful, user:", res.data.user);
      setIsAuthenticated(true);
      setUser(res.data.user || null);
      if (res.data.user?.isVerified !== undefined) {
        setIsVerified(res.data.user.isVerified);
      }
    } else {
      console.log("Auth failed, no success flag");
      setIsAuthenticated(false);
      setUser(null);
    }
  } catch (err) {
    console.error("Auth check error:", err.message);
    console.error("Error details:", err.response?.data || err.message);
    setIsAuthenticated(false);
    setUser(null);
  }
};

    checkAuth();
  }, []);

  const register = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/register", { email, password }, { withCredentials: true });
      if (res.data.success) {
        // navigate("/login", { state: { email } });
      }
      return res.data;
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });
      if (res.data.success) {
        setIsAuthenticated(true);
        setUser(res.data.user || null);
        if (res.data.user?.isVerified !== undefined) {
          setIsVerified(res.data.user.isVerified);
        }
        // navigate("/cosYspace");
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return res.data;
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      setIsVerified(false);
      // navigate("/login");
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

    const verifyOtp = async (email, otp) => {
    try {
      const res = await axiosInstance.post("/auth/verify-account", { email, otp }, { withCredentials: true });
      if (res.data.success) {
        setIsVerified(true); // rein optional
        navigate("/cosYspace");
      }
      return res.data;
    } catch (err) {
      console.error("OTP Verification Error:", err.response?.data || err.message);
      return { success: false, message: err.message };
    }
  };

  console.log("Context state:", { isAuthenticated, user });


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isVerified,
        register,
        verifyOtp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
