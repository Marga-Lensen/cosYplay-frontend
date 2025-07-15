// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/CosYspace.jsx

import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import chatPreview from "../previews/chatPreview.png";
import postPreview from "../previews/postPreview.png";
import "../styles/space-styles.css";

const CosYspace = () => {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const { isAuthenticated, user } = useAuth();
  console.log("Aktueller User:", user);
  console.log("cosYspace auth:", { isAuthenticated, user });

  return (
    <div className="cosyspace-container">
      <h1>🌸 Willkommen im 🌸 cosYspace 🌸</h1>
      {/* <p>Hallo {user?.username || user?.email || "User"}!</p> */}

      <div className="cosyspace-actions message-box">
        <div className="preview-box">
          <button onClick={() => navigate("/cosYchat")}>
            zu cosYchat 💬
          </button>
          <Link to="/cosYchat">
            <img src={chatPreview} alt="Chat Preview" className="preview-img" />
          </Link>
        </div>
<hr className="trennlinie" />
        <div className="preview-box">
          <button onClick={() => navigate("/cosYpost")}>
            zu cosYpost ✍️
          </button>
          <Link to="/cosYpost">
            <img src={postPreview} alt="Post Preview" className="preview-img" />
          </Link>
        </div>        
    <hr className="trennlinie"/>    
        <div className="preview-box">
                  <button onClick={() => navigate("/logout")}>Logout 🔓</button>
{/*         <Link>
          <img
            src="https://placehold.co/200x150?text=Placeholder"
            alt="Testbild"
          />
        </Link> */}
        </div>


      </div>
    </div>
  );
};

export default CosYspace;
