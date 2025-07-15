// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/auth-styles.css'; //  Auth-Styles für alle auth routes

// const AuthLayout = ({ children }) => {
const AuthLayout = () => {
  return (
    <div className="auth">
      <div className="auth-wrapper">
      {/* Hier kann später auch Navbar o. Ä. rein */}
          <Navbar />

      {/* {children} */}
      <Outlet />
    </div>
    </div>
  );
};

export default AuthLayout;
