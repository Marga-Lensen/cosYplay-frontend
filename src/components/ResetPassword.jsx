import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  // const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  // const [newPassword, setNewPassword] = useState("");  // schicke pwd mit POST mit
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || localStorage.getItem("lastLoginEmail") || "");


  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/reset-password", {
        email,
        otp,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Fehler beim Zurücksetzen des Passworts.");
    }
  };

  return (
    <div>
      <h2>Passwort zurücksetzen</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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
        <button type="submit">Passwort zurücksetzen</button>

        {message && 
        <p className="message-box">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
