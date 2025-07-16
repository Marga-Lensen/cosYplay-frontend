//  WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYplay-aka-cosYspace-auth/_cosYplay-fullstack-SPA/auth-frontend/src/modules/cosYpost/UploadForm.jsx

import { useState, useRef } from "react";
import UploadMessagePreview from "./components/UploadMessagePreview";

const UploadForm = ({ uploadFile, setView }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  // New fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Bitte wähle eine Datei aus.");

    // new fields
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      // const res = await uploadFile(file);
      const res = await uploadFile(formData); // update to accept FormData
      setMessage(res.message); // z.B. "Datei erfolgreich hochgeladen"

      // Erfolgreich hochgeladen → automatisch zum Feed wechseln
      // Scroll zur Message, wenn sie gesetzt wurde
      setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
      // aber in zwei Schritten; erst Hinweis dann Weiterleitung
      // 1 Sekunde warten, dann Message ändern
      setTimeout(() => {
        setMessage("Dein Post ist live! Schaue es dir am im Feed ⤴️");
        // setView("files");
      }, 2500);

      // 3.5 Sekunden nach Erfolg: Seitenwechsel
      setTimeout(() => {
        // setMessage("Dein Post ist live! Schaue es dir am im Feed ⤴️")
        setView("files");
      }, 6500);
    } catch (err) {
      setMessage(err.message || "Upload fehlgeschlagen");
    }

    // hier form reset und evtl toggle
    // Reset optional
    /*       setFile(null);
      setPreview("");
      setTitle("");
      setDescription(""); */
  };

  return (
    <div className="file-container">
      <form onSubmit={handleSubmit}>
        <div className="upload-container">
          <h4>Was möchtest du heute mit uns teilen?</h4>

          {/*      <label> */}
          {/*  Titel: */}
          <input
            type="text"
            placeholder="Titel eingeben"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {/*  </label> */}

          {/*         <label> */}
          {/*           <p>Nachricht:</p> */}
          <textarea
            value={description}
            placeholder="Gib hier deine Nachricht ein"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            /* required */
          />
          {/*         </label> */}

          <div className="file-upload">
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="file-upload">
          <button
            className="post-btn"
            type="submit"
            style={{ width: "200px", display: "flex", alignItems: "center" }}
          >
            <img
              src="/upload-favicon-no-bg.png"
              alt="upload"
              style={{ width: 30, marginRight: "1em" }}
            />
            Jetzt posten
          </button>
        </div>
      </form>

      {/* uploadMessage zum testen */}
      {/* < UploadMessagePreview /> */}


      {preview && (
        <div className="preview-box">
          <div className="preview-header">
            <h4>Vorschau:</h4>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="remove-image-btn"
              title="Bild entfernen"
            >
              ✖️
            </button>
          </div>

          <div className="vorschau-inhalt">
            {/* <p>{title}</p> */}
            <img
              src={preview}
              alt="Preview"
              max-width="300px"
              style={{ border: "1px solid indigo", borderRadius: "8px" }}
            />
            {/* <p>{description}</p> */}
          </div>
        </div>
      )}
      {/* <hr /> */}
      {message && (
        <h3
        className="upload-message"
          ref={messageRef}
/*           style={{
            color: "skyblue",
            background: "darkslateblue",
            padding: "5px 10px",
            textAlign: "center",
          }} */
        >
          {message}
        </h3>
      )}
    </div>
  );
};

export default UploadForm;
