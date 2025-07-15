// src/FileList.jsx
import { useEffect, useState } from 'react';
import { getFiles } from './api/uploadService';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

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
    <div className="file-list">
      <h2>Posts</h2>
      {error && <p className="error">{error}</p>}
      {files.length === 0 ? (
        <p>Keine Dateien gefunden.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              <strong>{file.title}</strong>
              {file.filePath.endsWith('.jpg') || file.filePath.endsWith('.png') ? (
                <img src={`http://localhost:3000${file.filePath}`} alt={file.title} />
              ) : (
                <a href={`http://localhost:3000${file.filePath}`} target="_blank" rel="noreferrer">
                  Datei anzeigen
                </a>
              )}
              <p>{file.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
