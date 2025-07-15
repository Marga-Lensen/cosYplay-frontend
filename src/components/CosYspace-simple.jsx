import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/space-styles.css";

const CosYspace = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="cosyspace-container">
      <h1>Willkommen im 🌸 cosYspace 🌸</h1>
      {user && <p>Hallo, {user.username || user.email}!</p>}

      <div className="button-grid">
        <button 
          onClick={() => navigate("/cosYchat")} 
          className="action-button chat-button"
        >
          💬 cosYchat
        </button>
        
        <button 
          onClick={() => navigate("/cosYpost")} 
          className="action-button post-button"
        >
          ✍️ cosYpost
        </button>

        <button 
          onClick={() => navigate("/logout")} 
          className="action-button logout-button"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
};

export default CosYspace;