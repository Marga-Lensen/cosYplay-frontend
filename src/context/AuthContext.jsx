// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

import axiosInstance from "../axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();  // nicht hier! mach das in den komponenten!
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // optional, nicht zwingend

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth...");

      try {
        const res = await axiosInstance.post(
          "/auth/is-auth",
          {},
          { withCredentials: true }
        );
        console.log(
          "Auth check response, user:",
          JSON.stringify(res.data.user, null, 2)
        );

        console.log("Auth check response, res.data:", res.data);
        console.log("Cookies:", document.cookie); // Check if cookies are present

        if (res.data.success) {
          const user = res.data.user;
          console.log("✅ Auth successful with email:", user.email);
          console.log("🔐 isVerified (from DB):", user?.isVerified); // in mongoDB allerdings isAccountVerified
          /* isAuthenticated controller macht const isVeried = isAccountVerified conversion */

          setIsAuthenticated(true);
          setUser(user || null);
          if (user?.isVerified !== undefined) {
            console.log(
              "➡️ Setting isVerified state to (true if success):",
              user.isVerified
            );
            setIsVerified(user.isVerified);
          }
        } else {
          console.log("Auth failed, no success flag");
          setIsAuthenticated(false);
          setUser(null);
          setIsVerified(false);
        }
      } catch (err) {
        console.error("Auth check error:", err.message);
        console.error("Error details:", err.response?.data || err.message);
        setIsAuthenticated(false);
        setUser(null);
        setIsVerified(false);
      } finally {
        setLoading(false); // <- GANZ WICHTIG
      }
    };
    
    checkAuth();
  }, []);

  const register = async (email, password) => {
    try {
      const res = await axiosInstance.post(
        "/auth/register",
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
      }
      return res.data;
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsAuthenticated(true);
        setUser(res.data.user || null);
        setEmail(res.data.user?.email || null); // ⬅️ hier ergänzen
        if (res.data.user?.isVerified !== undefined) {
          console.log("📌 OTP verification status:", res.data.user.isVerified);
          setIsVerified(res.data.user.isVerified);
        }
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
      // setIsVerified(false); // natürlich NICHT tun !!!
      setEmail(null); // ⬅️ Reset
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await axiosInstance.post(
        "/auth/verify-account",
        { email, otp },
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log("✅ OTP verified. Setting isVerified to true");
        setIsVerified(true);
      }
      return res.data;
    } catch (err) {
      console.error(
        "OTP Verification Error:",
        err.response?.data || err.message
      );
      return { success: false, message: err.message };
    }
  };

  // console.log("Context state:", { isAuthenticated, isVerified, user });
  useEffect(() => {
    console.log("🔁 Auth Context state updated:", {
      isAuthenticated,
      isVerified,
      user,
    });
  }, [isAuthenticated, isVerified, user]);

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
