// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/Login.jsx

import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import './Login.scss'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("📍 Aktuelle Route:", location.pathname);

  const { isVerified } = useAuth(); // am Anfang deiner Komponente!
  // const { isAuthenticated, isVerified, loading } = useAuth();

  useEffect(() => {
    console.log("✅ isVerified updated:", isVerified);
  }, [isVerified]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // << very important!❕❕❕
        }
      );

     /*  if (res.data.user?.isVerified !== undefined) {
        // setIsVerified(res.data.user.isVerified);
        console.log("res.data.user mit isVerified: ", res.data.user);
      } */  // ❌ res.data.user gibt's hier gar nicht

      /* check isVerified before login */
      /*const { user } = response.data;

      if (!user?.isVerified) {
        setMessage("Bitte verifiziere zuerst deine Email-Adresse.");
        setIsError(true);
        setShowContinueButton(false);

        // Schicke User direkt zur SendOtp-Komponente mit Email
        // navigate("/send-verify-otp", { state: { email } });
        
        return;
      } */

      /*        // You can store token if needed
      localStorage.setItem("token", response.data.token);
      console.log("token:", token);
      console.log("token:", response.data.token); */

      // navigate("/verify-email/:token"); // Beispielseite nach Login
      // navigate(`/send-verify-otp/${response.data.token}`);
      // navigate(`/send-verify-otp`);

      // ------------- Success and error Messaging ---------------------------
      // Instead of navigating immediately:
      /*     setMessage(`Du bist eingeloggt! Ein 6-stelliger Code wurde an ${email} gesendet. Bitte verifiziere deine Email um deinen geschützten Bereich zu betreten.`);  // das kommt oben auf der seite 🤭 obwohl unterhalb vom form in .jsx
    setShowContinueButton(true); */

      // 🎉 Set success message      // 🎉 Erfolgreich eingeloggt + verifiziert
      // setMessage(`Willkommen zurück, ${email}!`); // das ist keine schöne Anrede, aber ... ${name} ist hier nicht mitgekommen....
      setMessage(`
        Du bist erfolgreich eingeloggt! 
        `);
      setIsError(false);
      setShowContinueButton(true);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Login fehlgeschlagen");
      setIsError(true);
      setShowContinueButton(false);
    }
  };

  /* NACH einloggen verifizieren - neuer componente - navigieren */
  const handleContinue = () => {
    setMessage("Du wirst weitergeleitet...");
    setTimeout(() => {
      // navigate("/verify-account");  // nur wenn OTP schon da wäre
      navigate("/send-verify-otp", { state: { email } });
    }, 1500);
  };

  // get rid of annoying yellow sticky autofilled password field
  useEffect(() => {
    const passwordInput = document.getElementById("password");
    if (passwordInput) passwordInput.value = "";
  }, []);

  return (
    <>
      <div className="page-container">
        {/* {console.log("🔁 Render: isVerified =", isVerified)} */}

        <h2>Login</h2>
        <div className="login-container">
          <form onSubmit={handleLogin}>
            <input
              autoFocus
              type="email"
              placeholder="Email"
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

            <button type="submit">Login</button>

            <p>
              {/* password vergessen? button or link to reset-password */}
              {/* <Link to="/reset-password"> */}
              <Link className="pwd-reset" to="/send-reset-otp" state={{email}}>
                <span>Passwort vergessen?</span>
              </Link>
            </p>
            {/* <button onClick={() => navigate("/send-reset-otp",{ state: { email } })}
            >
              Password Zurücksetzen
            </button> */}
          </form>

          {/* Erfolg: zeige Nachricht + Button */}
          {/* ✖️ das muss jetzt zu verify-account bzw VerifyEmail */}
          {/* das muss jetzt zu / send-verify-otp mit SendOtp.jsx */}
          {message && showContinueButton && (
            <div className="message-box">
             <h4>{message}</h4> 

              <p>Jetzt kannst du dein Account verifizieren</p>
              <button
                type="submit"
                className="continue-btn"
                onClick={handleContinue} // das geht nur wenn der einzige mit diesem handler
                // onClick={() => navigate("/send-verify-otp")}
              >
                Weiter zur 🔐 Verifizierung
              </button>
             {/*  <hr />
              <p>Oder direkt weiter zu cosYspace</p>
              <button
                type="button"
                className="continue-btn"
                onClick={() => navigate("/cosYspace")}
              >
                🌸 Weiter zu cos🍸️space 🌸
              </button> */}
            </div>
          )}

          {/* leider immer noch fehleranfällig ... dieser block w n gerendert... und navigation fällt immer zurück auf login */}

          {/* {isVerified && (
            <>
              <p>Dein Account ist verifiziert – du kannst fortfahren:</p>
              <button
                type="button"
                className="continue-btn"
                onClick={() => navigate("/cosYspace")}
              >
                🌸 Weiter zu cos🍸️space 🌸
              </button>
            </>
          )} */}

          {/* Fehler: zeige Nachricht */}
          {isError && <div className="message-box error">{message}</div>}
          {/* form-container schließtag */}
        </div>
        {/* page-container schließtag */}
      </div>
    </>
  );
};

export default Login;
