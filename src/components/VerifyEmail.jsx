import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";

// import axios from "axiosInstance";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  const handleVerifyOTP = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/verify-account",
        { otp },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setIsError(false);
      setShowContinueButton(true);
    } catch (error) {
      setMessage("Fehler bei der Verifizierung 🤔");
      setIsError(true);
      setShowContinueButton(false);
    }
  };

  /* tatsächlich zu cosYspace - neuer componente - navigieren */
  const handleContinue = () => {
    setMessage("Du wirst weitergeleitet...");
    setTimeout(() => {
      navigate("/cosYspace");
    }, 1500);
  };

  return (
    <>
      <div className="form-container">
        <h2>Bestätige deine E-mail</h2>
        <input
          type="text"
          placeholder="🔢 6-stelligen Einmalcode (OTP) eingeben"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Email verifizieren</button>
        {/* <p>{message}</p> */}
      </div>

{message && isError && (
  <div className="sendOtp">
                <button style={{width: "40%"}}
              onClick={() => navigate("/send-verify-otp", { state: { email } })}
            >
              Brauchst du eine zweite Chance? ↪️ Code erneut senden
            </button>
  </div>
)}
      {/* Erfolg: zeige Nachricht + Button */}
      {message && showContinueButton && (
        <div className="message-box">
{/*           {message} */}     
            <h4>Deine Email ist jetzt verifiziert! Du bist drin 🫂</h4>
            {/* <p>Bist du auch schon eingeloggt? <br /> Dann kannst du weiter: </p> */}
           <button
            type="submit"
            className="continue-btn"
            onClick={handleContinue}
          >
            🌸 Weiter zu cos🍸️space 🌸
          </button>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
