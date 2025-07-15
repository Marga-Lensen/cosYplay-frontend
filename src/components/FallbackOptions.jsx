// FallbackOptions.jsx
import { useNavigate, useLocation } from "react-router-dom";

const FallbackOptions = ({
  title = "Etwas ist schiefgelaufen",
  message,
  actions = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="message-box">
      <h4>{title}</h4>
      {message && <p>{message}</p>}

      {email && (
        <p>
          <strong>E-Mail:</strong> {email}
        </p>
      )}

      {actions.map(({ label, path, state, emoji }, index) => (
        <button
          key={index}
          onClick={() => navigate(path, { state })}
          className="option-button"
        >
          {emoji ? `${emoji} ` : ""}
          {label}
        </button>
      ))}
    </div>
  );
};

export default FallbackOptions;
