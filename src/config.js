// config.js

// export const API_BASE_URL = "http://localhost:4000/api";

const isProduction = process.env.NODE_ENV === "production";

export const API_BASE_URL = isProduction
  ? "https://yourdomain.com/api" // ✅ Adjust to your real domain later
  : "http://localhost:4000/api";
