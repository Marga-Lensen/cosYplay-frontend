// src/layouts/CosYwordsLayout.jsx
import "../styles/home-styles.css"; // enthält NUR styles für CosYwords

const CosYwordsLayout = ({ children }) => {
  return <div className="home">{children}</div>;
};

export default CosYwordsLayout;
