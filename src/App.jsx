// WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYspace-auth/cosYspace-fullstack-SPA/auth-frontend/src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header.jsx";
import AuthLayout from "./layouts/AuthLayout";
import CosYwordsLayout from "./layouts/CosYwordsLayout";
import CosYpostLayout from "./layouts/CosYpostLayout";
import { AuthProvider } from "./context/AuthContext.jsx";
import CosYchat from "./modules/cosYchat/CosYchat.jsx";
import ChatWidget from "./modules/cosYchat/ChatWidget.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import CosYwords from "./modules/cosYwords/CosYwords.jsx";
import Register from "./components/Register.jsx";
import EmailExistsOptions from "./components/EmailExistsOptions.jsx";
import SendOtp from "./components/SendOtp.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import Login from "./components/Login.jsx";
import CosYspace from "./components/CosYspace.jsx";
import CosYpost from "./modules/cosYpost/CosYpost.jsx";
import Logout from "./components/Logout.jsx";
import SendResetOtp from "./components/SendResetOtp.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Contact from "./components/Contact.jsx";

// Platzhalter-Komponenten für geschützte Seiten
// const CosYspace = () => <h2>cosYspace Main Page</h2>;
// const CosYchat = () => <h2>cosYchat</h2>;
// const CosYpost = () => <h2>cosYpost</h2>;

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <div className="app-container">
            {/* <Navbar /> */}

            <Routes>
              {/* Redirect root */}
              <Route path="/" element={<Navigate to="/cosYhome" replace />} />
              <Route
                path="/cosYhome"
                element={
                  <CosYwordsLayout>
                    <CosYwords />
                  </CosYwordsLayout>
                }
              />

              {/* Auth routes grouped under AuthLayout 💜 */}
              <Route element={<AuthLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/email-options" element={<EmailExistsOptions />} />
                <Route path="/send-verify-otp" element={<SendOtp />} />
                <Route path="/verify-account" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/send-reset-otp" element={<SendResetOtp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Protected Routes */}
              <Route
                path="/cosYspace"
                element={
                  <ProtectedRoute>
                  <CosYspace />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cosYchat"
                element={
                  // <ProtectedRoute>
                  <CosYchat />
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/chatwidget"
                element={
                  // <ProtectedRoute>
                  <ChatWidget />
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/cosYpost"
                element={
                  // <ProtectedRoute>
                  <CosYpostLayout>
                    <CosYpost />
                  </CosYpostLayout>
                  // </ProtectedRoute>
                }
              />
              {/* Catch-all 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
