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
  const email = location.state?.email // OPTION 🔢 wenn es mitgeschickt wird
  console.log(email);
  
  // const { email } = useAuth();  // OPTION 🔢 wenn wir es mit Context machen

  // 🔢 Optional, wenn du willst, dass der Wert im localStorage immer aktualisiert wird:
 // if (email) {
    // wichtig, sonst könnte null bzw undefined geschrieben werden
    // localStorage.setItem("lastLoginEmail", email);
  // }

  /* ########### ⚠️ ############ 
  neu, WICHTIG, sollte greifen wenn man zum /cosYspace will (z.B. über Hamburger menü) aber nicht darf 
  - ProtectedRoute schickt dich hierhin.
  - du hast aber keine Email mitgenommen (geht nicht aus ProtectedRoute)
  
  neue Situation:
  man ist hier weil !isVerified aber email ist verloren gegangen
   ############# ⚠️ ############## */

  // useEffect(() => {
  //   if (!email) {
  //     setMessage("🤔 Keine E-Mail gefunden – Weiterleitung zum Login ...");
  //     const timeoutId = setTimeout(() => navigate("/login"), 4500);
  //     return () => clearTimeout(timeoutId); // ← Aufräumen
  //   }
  //   }, [email, navigate]);
  // // }, [email]);

  const handleOTPRequest = async () => {
    if (!email) return;

    if (isVerified) {
      setMessage(`ℹ️ Dein Account (${email}) ist bereits verifiziert.`);
      return;
    }

    setIsSending(true);
    // setMessage("");  // oder aktivieren ❔  erstmal stehen lassen

    try {
      const res = await axiosInstance.post(
        "/auth/send-verify-otp",
        {},
        { withCredentials: true }
      );

      // if (res.data.success === true) {   // ❔ jetzt gar nicht mehr abfragen ?
      /* if (!res.data.success) {  // ❔ jetzt gar nicht mehr abfragen ?
      /* doch: in catch(error) block ⤵️ switch cases aufgrund error messages u status code! */
      /*  const backendMessage = res.data.message;
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
        `✅ OTP wurde per Email an ${email} gesendet. 
          
          Du wirst gleich zur Eingabe weitergeleitet...`
      );

      // Weiterleitung zur Verifizierung nach kurzer Pause
      setTimeout(() => {
        navigate("/verify-account", { state: { email } });
      }, 4500);
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
              "🤯 Zu viele Anfragen – bitte warte etwas, bevor du es erneut versuchst."
            );
            break;
          case 404:
            setMessage("🤷🏿‍♀️ Benutzerkonto wurde nicht gefunden.");
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
      {/* Nachricht */}
      {!email && (   // ➕ war ausgeklammert mit message, aber nur !email hatten wir noch nicht
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}

      {email && !isVerified && (
        <div className="sendOtp">
          <h4>
            Sende einen Verifizierungs-OTP an: <strong>{email}</strong>.
          </h4>
          <p>Der Code ist 15 Minuten lang gültig.</p>
        </div>
      )}
      {/* Standard-Sendebutton */}
      {!isVerified && email && (   // ➕ email hinzugefügt
        <button onClick={handleOTPRequest} disabled={isSending}>
          {isSending ? "Sende..." : "OTP senden"}
        </button>
      )}


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
