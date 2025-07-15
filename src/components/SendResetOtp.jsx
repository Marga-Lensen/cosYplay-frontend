// SendResetOtp.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SendResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const email = location.state?.email || localStorage.getItem("lastLoginEmail");

  if (email) {
    localStorage.setItem("lastLoginEmail", email);
  }

  useEffect(() => {
    if (!email) {
      setMessage("Keine E-Mail gefunden – Weiterleitung zur Registrierung ...");
      const timeoutId = setTimeout(() => navigate("/register"), 4500);
      return () => clearTimeout(timeoutId);
    }
  }, [email, navigate]);

  const handleSendResetOtp = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/send-reset-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailSent(true);
        setMessage("OTP zum Zurücksetzen wurde gesendet.");
        setTimeout(
          () => navigate("/reset-password", { state: { email } }),
          2000
        );
      } else {
        const data = await response.json();
        setMessage(data.error || "Fehler beim Senden der OTP.");
      }
    } catch (err) {
      setMessage("Serverfehler. Bitte versuche es später erneut.");
    }
  };

  return (
    <div className="page-container">
      <h2>Passwort zurücksetzen</h2>

{/*       <button
        onClick={() => {
          fetch("http://localhost:4000/api/auth/send-reset-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "test@example.com" }),
          })
            .then((res) => res.json())
            .then(console.log)
            .catch(console.error);
        }}
      >
        Test
      </button> */}

      {email && !emailSent && (
        <div className="form-container">
          <p>
            Eine OTP zum Zurücksetzen deines
            Passworts wird geschickt an:
          </p>
          <p>
            <strong>{email}</strong>
          </p>
          <button onClick={handleSendResetOtp}>🔐 OTP senden</button>
        </div>
      )}

      {message && <div className="message-box">{message}</div>}
    </div>
  );
};

export default SendResetOtp;
