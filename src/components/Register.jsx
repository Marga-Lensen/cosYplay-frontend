// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/Register.jsx

import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formMessage, setFormMessage] = useState(""); // subtle inline
  const [statusMessage, setStatusMessage] = useState(""); // controls message box

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend field validation
    if (!name || !email || !password) {
      setFormMessage("Bitte fülle alle Felder aus.");
      setStatusMessage(""); // Don't show message box
      return;
    }

    try {
      // Step 1: Register the user
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      // Step 2: Send OTP (backend sends it via email)
      // await axiosInstance.post("/auth/send-verify-otp", { email });
      // ❕ neuer flow: erst einloggen dann verifizieren

      // Step 3: Success message and navigate to OTP verification page
      // ✅ Backend success response
      setStatusMessage(
        // "Du wurdest erfolgreich registriert! Bitte überprüfe deine E-Mail für den Verifizierungscode (OTP) 🔢."  // das machen wir nicht mehr so
        "Du wurdest erfolgreich registriert!"
      );

      
      setFormMessage("");

      // Navigate to /verify-account, pass email for context (optional)
      // navigate("/verify-account", { state: { email } });
      
    } catch (error) {
      const status = error?.response?.status;
      const errMsg = error?.response?.data?.message || "";

      if (status === 400 && errMsg.toLowerCase().includes("password")) {
        setFormMessage(
          `Dein Passwort ist nicht stark genug!
          Bitte benutze Groß- und Kleinbuchstaben, Ziffer und Sonderzeichen und mindestens 8 Zeichen.`
        );
        setStatusMessage("");
        return;
      }

      if (status === 409 && errMsg === "EMAIL_EXISTS") {
        setStatusMessage("EMAIL_EXISTS");
        setFormMessage("");
        return;
      }

      setFormMessage(
        "Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben."
      );
      setStatusMessage("");
    }
  };

  return (
    <div className="register-container">
      <h2>Registrierung</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {/* {showPassword ? "🙈" : "👁️"} */}
            {showPassword ? "🤫" : "🫣"}
          </span>
        </div>
        <button type="submit">Registrieren</button>

        {formMessage && <p className="form-message subtle">{formMessage}</p>}
      </form>

      {/* ✅ Existing email */}
      {statusMessage === "EMAIL_EXISTS" && (
        <div className="message-box">
          <p>
            Die E-Mail <strong>{email}</strong> ist bereits registriert.
            <br />
            Du hast jetzt drei Optionen 🧭
          </p>
          <button
            onClick={() => navigate("/email-options", { state: { email } })}
          >
            Zu den Optionen 🛣️
          </button>
        </div>
      )}

      {/* ✅ Successful registration */}
      {statusMessage && statusMessage !== "EMAIL_EXISTS" && (
        <div className="message-box">
          <h4>{statusMessage}</h4>
          <p>Du kannst dich jetzt einloggen.</p>
          <button onClick={() => navigate("/login", {state: {email}})}>Einloggen</button> 


          {/* die buttons gehören hier nicht mehr; erst NACH LOGIN verifizieren */}
          {/*<div className="button-group">
            <button
              onClick={() => navigate("/verify-account", { state: { email } })}
            >
              ✅ E-Mail verifizieren
            </button>

            <button
              onClick={() => navigate("/send-verify-otp", { state: { email } })}
            >
              🔁 OTP erneut senden
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Register;
