import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Aperture from "../../components/Aperture";
// import './CosYwords.css';

function CosYwords() {
  const [message, setMessage] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isApertureOpen, setIsApertureOpen] = useState(false);
  const [magicMessage, setMagicMessage] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  console.log("📍 Aktuelle Route:", location.pathname);

  const messages = [
    "I love myself unconditionally",
    "I am a good person who deserves to be happy",
    "I take pride in who I am",
    "I am happy just being me",
    "I am totally comfortable being myself",
    "I have limitless confidence in my abilities",
    "I accept myself deeply and completely",
    "I have accomplished great things",
    "Others are inspired by my ability to be myself",
    "I have confidence in my ability to do whatever I set my mind to",
    "I am finding it easier to love and accept myself",
    "Each day I become more confident in who I am",
    "I will take time to remember all my accomplishments",
    "I will love myself unconditionally no matter what",
    "I am beginning to see all the positive qualities and traits that I have",
    "Others are starting to notice my self acceptance and improved confidence",
    "I am discovering more wonderful things about myself with each passing day",
    "I am beginning to truly love myself",
    "Loving myself feels more natural and effortless",
    "I will always accept myself unconditionally",
    "Loving myself is essential to my happiness",
    "I deserve to go after my goals and do what makes me happy",
    "I find it easy to recognize my positive qualities",
    "Being happy with myself is a normal part of my every day life",
    "I find it easy to be confident and comfortable with who I am",
    "Accepting myself unconditionally gives me the power to succeed",
    "I know I have the right to be happy and nothing can take that away from me",
    "Loving myself and being happy with who I am comes naturally to me",
    "I truly like myself and this helps others to accept me for who I am",
    "I have a natural awareness of all the positive things in my life",
  ];

  const generateMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setIsMessageVisible(true);

    setTimeout(() => {
      setIsMessageVisible(false);
    }, 60000);
  };

  useEffect(() => {
    /* setIsMessageVisible(false); */ // Nachricht wird nicht sofort angezeigt, sondern erst nach dem Klick auf den Button
    generateMessage(); // beim laden der Seite wird sofort eine Nachricht generiert;
  }, []);

    const handleRegister = () => {
    console.log("📸 Login-Button gedrückt");
    setIsApertureOpen(true);
  setMagicMessage("✨ Das Portal zum 🌸 cosYspace 🌸 öffnet sich!");
    // Magie & Weiterleitung nach 2s
    setTimeout(() => {
      navigate('/register');
      setMagicMessage(""); // Nachricht nach Navigation ausblenden (optional)
    }, 5000);
  };
    const handleLogin = () => {
    console.log("📸 Login-Button gedrückt");
    setIsApertureOpen(true);
  setMagicMessage("✨ Das Portal zum 🌸 cosYspace 🌸 öffnet sich!");
    // Magie & Weiterleitung nach 2s
    setTimeout(() => {
      navigate('/login');
      setMagicMessage(""); // Nachricht nach Navigation ausblenden (optional)
    }, 5000);
  };


  return (
    <div className="home-container">
      {/*       <header>
        <img className="logo" src="/LogoBluete.png" alt="" />
        <h1>cosYplay</h1>
      </header> */}
      <h1 className="home header">CosYwords for you: </h1>
      {isMessageVisible && (
        <div className="message">
          <h2>{message}</h2>
        </div>
      )}
      <button onClick={generateMessage}>neue cos🍸️words</button>

      <div className="auth-btn">
        {/* <button onClick={() => navigate("/register")}>Registrierung</button> */}
        <button onClick={handleRegister}>Registrierung</button>
        {/* <button onClick={() => navigate("/login")}>Login</button>{" "} */}
      <button onClick={handleLogin}>Login</button>
      </div>
      <Aperture  isOpen={isApertureOpen} />
      {/* hier muss noch der Login verknüpft werden */}

      {magicMessage && (
  <div className="magic-message">
    <p>{magicMessage}</p>
  </div>
)}

    </div>
  );
}

export default CosYwords;
