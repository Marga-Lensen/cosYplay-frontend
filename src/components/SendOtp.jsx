// _~/src/components/SendOtp.jsx

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../context/AuthContext";

const SendOtp = () => {
  const { isVerified, isAuthenticated } = useAuth();
  const [message, setMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);

  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const email = location.state?.email || localStorage.getItem("lastLoginEmail");
  const email = location.state?.email 
  console.log(email);
  

  // Optional, wenn du willst, dass der Wert im localStorage immer aktualisiert wird:
  if (email) {
    // wichtig, sonst könnte null bzw undefined geschrieben werden
    localStorage.setItem("lastLoginEmail", email);
  }

  useEffect(() => {
    if (!email) {
      setMessage("Keine E-Mail gefunden – Weiterleitung zur Registrierung ...");
      const timeoutId = setTimeout(() => navigate("/register"), 4500);
      return () => clearTimeout(timeoutId); // ← Aufräumen
    }
    // }, [email, navigate]);
  }, [email]);

  const handleOTPRequest = async () => {
    if (isVerified) {
      setMessage(`ℹ️ Dein Account (${email}) ist bereits verifiziert.`);
      return;
    }
    if (!email) return;

    setIsSending(true);
    // setMessage("");

    try {
      const res = await axiosInstance.post(
        "/auth/send-verify-otp",
        {},
        { withCredentials: true }
      );

      // if (res.data.success === true) {
      /* if (!res.data.success) {
        const backendMessage = res.data.message;
        switch (backendMessage) {
          case "User is already verified.":
            setMessage(`ℹ️ Dein Account (${email}) ist bereits verifiziert.`);
            break;
          case "User not found.":
            setMessage(`❌ Benutzerkonto nicht gefunden.`);
            break;
          case "No userId provided.":
            setMessage(`❌ Anfrage ungültig – fehlende Benutzer-ID.`);
            break;
          default:
            setMessage(`❌ Fehler: ${backendMessage}`);
        }
      } else { */
      setMessage(
        `✅ OTP wurde per Email gesendet. 
          
          Du wirst gleich zur Eingabe weitergeleitet...`
      );

      // Weiterleitung zur Verifizierung nach kurzer Pause
      setTimeout(() => {
        navigate("/verify-account", { state: { email } });
      }, 5000);
    } catch (error) {
      if (error.response) {
        /*     const backendMessage = error.response.data?.message;
    switch (backendMessage) { */
        const status = error.response.status;
        const backendMessage = error.response.data?.message;
        setErrorCode(status);

        switch (status) {
          case 409:
            setMessage(
              "Dein Account ist bereits verifiziert." || `${backendMessage}`
            );
            break;
          case 429:
            setMessage(
              "⚠️ Zu viele Anfragen – bitte warte etwas, bevor du es erneut versuchst."
            );
            break;
          case 404:
            setMessage("❌ Benutzerkonto wurde nicht gefunden.");
            break;
          default:
            setMessage(
              `❌ Fehler (${status}): ${backendMessage || "Unbekannter Fehler"}`
            );
        }
      } else {
        setMessage("❌ Serverfehler beim Senden des OTP.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="form-container">
      <h2>E-Mail Verifizieren</h2>
      {email && !isVerified && (
        <div className="sendOtp">
          <h4>
            Sende einen Verifizierungs-OTP an: <strong>{email}</strong>.
          </h4>
          <p>Der Code ist 15 Minuten lang gültig.</p>
        </div>
      )}
      {/* Standard-Sendebutton */}
      {!isVerified && (
        <button onClick={handleOTPRequest} disabled={isSending}>
          {isSending ? "Sende..." : "OTP senden"}
        </button>
      )}

      {/* Nachricht */}
{/*       {message && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )} */}

      {/* Fehler: Bereits verifiziert */}
      {errorCode === 409 && (
        <div className="message-box">
          <p>{message}</p>
          <h4>Bist du auch schon eingeloggt? Dann kannst du weiter zu cosYspace</h4>
          <button onClick={() => navigate("/cosYspace")}>🌸 Weiter zu cosYspace 🌸</button>
        </div>
      )}

      {/* Fehler: Rate limit */}
      {errorCode === 429 && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}

      {message && !errorCode && /* !response.data.success && */ (
        <div className="message-box">
        <button onClick={() => navigate("/send-verify-otp", {state: {email}})}>Erneut versuchen</button>
        </div>
      )}

      {/* Weiter-Button nur wenn verifiziert & eingeloggt */}
      {isVerified && isAuthenticated && (
        <>
          <p>{message}</p>
         <p>Dein account <strong>{email}</strong> ist schon verifiziert! ✔️</p>
         <p>... </p>
           <h4>Du kannst weiter zum geschützen Bereich </h4>
          <button onClick={() => navigate("/cosYspace")} className="verify-btn">
            🌸 Weiter zu cos🍸️space 🌸
          </button>
        </>
      )}
    </div>
  );
};

export default SendOtp;
