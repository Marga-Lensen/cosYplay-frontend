  // WebDev_Jahreskurs/_final-project-MDM/_cosYplay-MaLe/cosYplay-aka-cosYspace-auth/_cosYplay-fullstack-SPA/auth-frontend/src/modules/cosYpost/FileList.jsx
import { useEffect, useState } from "react";
  import axiosInstance from "../../axiosInstance";
  
  const FileList = ({getFiles}) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
      const loadFiles = async () => {
        try {
          const result = await getFiles();
          setFiles(result);
        } catch (err) {
          setError(err.message);
        }
      };
      loadFiles();
    }, []);

    return (
      <div className="feed-container">
        <div className="file-list">
          <h2>Posts</h2>
          {error && <p className="error">{error}</p>}
          {files.length === 0 ? (
            <p>Keine Bilder gefunden.</p>
          ) : (
            <ul>
              {files.map((file) => (
                <li key={file._id}>
                  <strong>{file.title}</strong>
                  {file.filePath.endsWith(".jpg") ||
                  file.filePath.endsWith(".png") ? (
                    <img
                      src={`http://localhost:4000${file.filePath}`}
                      alt={file.title}
                    />
                  ) : (
                    <a
                      href={`http://localhost:4000${file.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Bild anzeigen
                    </a>
                  )}
                  <p>{file.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  export default FileList