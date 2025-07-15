// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/Logout.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "./Logout.css";

const Logout = () => {
  const [loggingOut, setLoggingOut] = useState(false); // To manage loading or state of logout
  const [message, setMessage] = useState(""); // To store the message
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true); // Start the logout process
    setMessage("Du wurdest ausgeloggt 👋. Du kannst dich erneut einloggen ...");

    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true }); // Send logout request to backend  // 📌 withCredentials: true ist notwendig, um den Cookie mitzuschicken – sonst sieht dein Backend gar keinen Cookie, und clearCookie() wirkt ins Leere.
      // await axiosInstance.post("/auth/is-auth", {}, { withCredentials: true }); // direkt nach dem Logout prüfen, ob der Cookie noch existiert  // --> sollte 401 geben

      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      // Remove the token  // optional; nur nötig wenn in Login gesetzt

      // setTimeout(() => navigate("/login"), 3000); // Redirect after 3 sec
      setTimeout(() => navigate("/cosYhome"), 3000); // Redirect after 3 sec
    } catch (error) {
      console.error("Logout fehlgeschlagen:", error);
      console.error("Fehlerantwort:", error?.response?.data);
      setMessage(
        "Es gab ein Problem beim Ausloggen. Bitte versuche es später noch einmal."
      );
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Logout</h2>
        {!loggingOut ? (
          <button onClick={handleLogout}>Abmelden</button> // Show button if not logging out
        ) : (
          <div>
            <p>{message}</p> {/* // Show message while logging out */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
