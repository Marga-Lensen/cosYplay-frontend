// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isVerified, loading } = useAuth();

  // const { isAuthenticated, loading } = useAuth();

if (loading) return null; // oder Spinner

// return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
//  "unreachable code detected"  --- wsl weil (noch) kein < Outlet /> ❔

if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!isVerified) return <Navigate to="/send-verify-otp" replace />;
  // Redundant, weil Login isVerified prüft – bleibt zur Sicherheit vorläufig aktiv
  // das war in der vorigen version zutreffend; wo verify VOR login war

  return children;
};


export default ProtectedRoute;

// 🤓 Dev-note:
// 🔁 Das replace sorgt dafür, dass der Redirect nicht in den Verlauf wandert – nützlich, wenn du z. B. nach /login gehst und nicht willst, dass der Zurück-Button dich nochmal zur geschützten Route führt.