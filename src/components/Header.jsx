// src/components/Header.jsx
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  /* const isFixedHeader = ["/cosYchat", "/cosYpost"].includes(location.pathname); */
  const noFixedHeaderRoutes = ["/cosYhome", "/cosYspace"];
  const isFixedHeader = !noFixedHeaderRoutes.includes(location.pathname);

  return (
    <header className={isFixedHeader ? "fixed-header" : ""}>
      {/*  <img
        className="logo"
        src="/LogoBluete.png"
        alt="CosYplay Logo"
        title="Zur Startseite" // Tooltip für das Logo
        onClick={() => navigate("/cosYhome")}
        style={{ cursor: "pointer" }} // Optional für besseres UX
      /> */}
      <h1
        className="home"
        onClick={() => navigate("/cosYhome")}
        title="Zur Startseite" // Tooltip für den Titel
        style={{ cursor: "pointer" }}
      >
        🌸 cosYplay
      </h1>

      {/* Hamburger-Button */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Dropdown-Menü */}
      {menuOpen && (
        <nav className="dropdown-menu">
          <Link to="/cosYspace" onClick={() => setMenuOpen(false)}>
            🌸 cosYspace
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            🛎️ Kontakt
          </Link>
          {/* <Link to="/links" onClick={() => setMenuOpen(false)}>🛎️ Kontakt</Link> */}
          <a href="https://wonderl.ink/@cosyplay">🔗 Links</a>
          <Link to="/logout" onClick={() => setMenuOpen(false)}>
            👋🏻 Logout
          </Link>
        </nav>
      )}
    </header>
  );
}
