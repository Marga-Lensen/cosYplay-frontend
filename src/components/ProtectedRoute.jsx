// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "./Spinner.jsx";

const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, loading } = useAuth();
  const { isAuthenticated, isVerified, loading } = useAuth();
  // Warten auf Auth-Status aus Context
  // Danach prüfen auf Login und OTP-Verification

  // if (loading) return null; // oder Spinner
  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/send-verify-otp" replace />;
  }
  // Redundant, weil Login isVerified prüft – bleibt zur Sicherheit vorläufig aktiv
  // das war in der vorigen version zutreffend; wo verify VOR login war

  return children;
};

export default ProtectedRoute;

// 🤓 Dev-note:
// 🔁 Das replace sorgt dafür, dass der Redirect nicht in den Verlauf wandert – nützlich, wenn du z. B. nach /login gehst und nicht willst, dass der Zurück-Button dich nochmal zur geschützten Route führt.
