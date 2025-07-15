import React from "react";
import bgImage from "../previews/chatPreview.png"

const NotFoundPage = () => {
  return (
/*     <div className="page-container"
    style={{

       backgroundImage: src={bgImage},
    }}
   
    > */
    <div
      style={{
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
        padding: "2rem",
        paddingTop: "77px"
      }}
    >
      <img
        src="/404notFound.png" // Pfad anpassen
        alt="404 Not Found"
        style={{
          // background: linearGradient ("blue", "red"),
          // background: "aliceblue",
          opacity: ".7",
          maxWidth: "700px", // max Größe
          width: "80%", // responsive
          paddingTop: "1.5rem",
          marginBottom: ".6rem",
          borderRadius: "12px",
          boxShadow: "0 6px 9px rgba(0, 195, 255, 0.7)",
        }}
      />
      {/* <h1 style={{ marginBottom: "0.5rem" }}>404 — Seite nicht gefunden</h1> */}
      <p style={{
        background: "darkslateblue",
        opacity: ".753",
        borderRadius: "6px",
        boxShadow: "0 0 15px rgba(0, 195, 255, 0.7)",

         maxWidth: "450px", 
         padding: "6px",
         color: "white", 
         textShadow: "1px 1px 6px black",
        fontWeight: "bolder" ,
        textAlign: "center"
         }}>
        Oops! Diese Seite existiert nicht oder wurde verschoben.
      </p>
    </div>
    // </div>
  );
};

export default NotFoundPage;
