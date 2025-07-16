// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/CosYspace.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaComments, FaEdit, FaSignOutAlt } from "react-icons/fa"; // React-Icons
import Aperture from "./Aperture";

import "../styles/space-styles.css";

const CosYspace = () => {
    const [isApertureOpen, setIsApertureOpen] = useState(true); // Portal ist offen im CosYspace
    const [logoutMessage, setLogoutMessage] = useState("");
    // const { user, logout } = useAuth();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const { isAuthenticated, user, logout } = useAuth();
  console.log("Aktueller User:", user);
  console.log("cosYspace auth:", { isAuthenticated, user });

    const handleLogout = () => {
    console.log("🌀 Logout mit schließendem Portal...");
    setLogoutMessage("✨ Das Portal schließt sich – du verlässt cosYspace …");
    setIsApertureOpen(false); // Portal schließen

    setTimeout(() => {
      logout();         // Session beenden
      navigate("/cosYhome");    // Zur Startseite
    }, 3500); // Muss mit Aperture-Animation übereinstimmen
  };

  return (
    <div className="cosyspace-container">
      <h1>🌸 Willkommen im 🌸 cosYspace 🌸</h1>
      {/* <p>Hallo {user?.username || user?.email || "User"}!</p> */}

      <div className="exit">
        {/* <button className="logout-button" onClick={() => navigate("/logout")}> */}
        <button className="logout-button" onClick={handleLogout}>
          Logout <FaSignOutAlt className="button-icon" />
        </button>
      {logoutMessage && <p className="portal-message">{logoutMessage}</p>}
        <Aperture isOpen={isApertureOpen}/>
      </div>

      <div className="button-grid">
        {/* Chat-Button mit Icon */}
        <button onClick={() => navigate("/cosYchat")} className="action-button">
        <div className="chat-widget">
          <FaComments className="button-icon" />
          <span>cosYchat</span>
          <span className="widget">💬</span>
</div>
        </button>


        {/* Post-Button mit Icon */}
        <button onClick={() => navigate("/cosYpost")} className="action-button">
          <div className="post-widget">
            <FaEdit className="button-icon" />
            <span>cosYpost</span>
            
          {/* <span className="widget">🏞️</span> */}
          {/* <span className="widget">🌄</span> */}
          {/* <span className="widget">📝</span> */}
          {/* <span className="widget">🏔️</span> */}
           <img 
    src="/upload-favicon-no-bg.png" 
    alt="Chat" 
    className="button-icon widget"
    style={{ width: "77px", height: "77px" }}
    />  
    </div>
        </button>

        {/* Logout-Button mit Icon */}
        {/*      <button 
          onClick={() => navigate("/logout")} 
          className="action-button"
        >
          <FaSignOutAlt className="button-icon" />
          <span>Logout</span>
        </button> */}
      </div>
    </div>
  );
};

export default CosYspace;
