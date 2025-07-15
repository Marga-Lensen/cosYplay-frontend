import { useNavigate, useLocation } from "react-router-dom";
/* import "./EmailExistsOptions.scss"; // optional styling */


const EmailExistsOptions = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const email = location.state?.email
  console.log(email);
  

  return (
    <div className="message-box">
      <h4>Ein Konto mit dieser E-Mail-Adresse "<span>{email}</span>" existiert bereits</h4>
      <p><span>Was möchtest du tun?</span></p>
      {/* <div className="button-group">
        <button onClick={() => navigate("/login")}>Einloggen</button>
        <button onClick={() => navigate("/verify")}>Verifizieren</button>
        <button onClick={() => navigate("/register")}>Neues Konto anlegen</button>
      </div> */}
      <p>Falls du deinen Account schon verifiziert hast, kannst du dich einloggen:</p>
      <button onClick={() => navigate("/login")}>Weiter zum Login 👉️</button>

      <p>Falls du deinen Account noch verifizieren musst, kannst du das jetzt tun:</p>
      <button onClick={() => navigate("/send-verify-otp", { state: { email } })}>🔒️ Zur Verifizierung 🔓️</button>

      <p>Wenn du lieber ein neues Konto mit einer anderen Emailadresse anlegen möchtest:</p>
      <button onClick={() => navigate("/register")}>👈️ Neues Konto anlegen</button>
    </div>
  );
};

export default EmailExistsOptions;
