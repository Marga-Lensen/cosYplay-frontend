import { useNavigate, Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const statusRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Bitte fülle alle Felder aus.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Fehlerantwort vom Server:", data);
        setStatus(
          data.error || "Fehler beim Senden. Bitte versuche es erneut."
        );
        return;
      }

     
        setStatus("Deine Nachricht wurde gesendet!");

        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => {
          if (statusRef.current) {
            statusRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
    

      setTimeout(() => {
        if (statusRef.current) {
          statusRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // leicht verzögert, damit das Element gerendert ist

          setTimeout(() => {
      setStatus(null);
    }, 5000);
    
    } catch (err) {
      console.error("Fehler beim Senden:", err);
      setStatus("Serverfehler. Bitte später erneut versuchen.");
    }
  };

  return (
    <div className="contact-page">
      {/* <h1>Kontakt</h1> */}
      <div className="contact-container">
        <h4>
          Bei Fragen oder Anregungen kannst du uns gerne kontaktieren unter:
        </h4>

        <a href="mailto:cosyplay25@gmail.com">
          <FaEnvelope size={20} style={{ marginRight: "0.5rem" }} />{" "}
          cosyplay25@gmail.com
        </a>

        <p>Oder gerne auch über:</p>
        <div className="contact-info">
          <a
            href="https://github.com/Marga-Lensen"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={20} style={{ marginRight: "0.5rem" }} />
            Marga Lensen
          </a>

          <a
            href="https://github.com/Manfred-Berginski"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={20} style={{ marginRight: "0.5rem" }} />
            Manfred Berginski
          </a>
          <a
            href="https://wonderl.ink/@dorispasicstudio"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/wonderlink-logo.png"
              alt="WonderLink"
              className="wonderlink-icon"
            />
            Doris Pasic
          </a>
        </div>
      </div>

      <div className="contact-form-wrapper">
        <h2>Schick uns eine Nachricht</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          {/* <label>
            Name: */}
          <input
            placeholder="Dein Name:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* </label> */}

          {/* <label>
            E-Mail: */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine E-Mailadresse:"
            required
          />
          {/* </label> */}

          {/* <label>
            Nachricht: */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Was möchtest du uns melden oder fragen?"
            required
          />
          {/* </label> */}

          <button type="submit">Absenden</button>

          {/* {status && <p className="status-message">{status}</p>} */}

          {status && (
            <p className="status-message" ref={statusRef}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
