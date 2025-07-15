import React, { useState } from 'react';
import { useEffect, useState } from 'react';
import { getFiles } from './api/uploadService';
import { uploadFile } from './api/uploadService.js';
import './UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

   // New fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Bitte wähle eine Datei aus.');

    // new fields
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      // const res = await uploadFile(file);
      const res = await uploadFile(formData);  // update to accept FormData
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message || 'Upload fehlgeschlagen');
    }

    // hier form reset und evtl toggle
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <h2>Datei hochladen</h2>

        <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          />
      </label>

<div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Hochladen</button>
</div>

      <label>
        Nachricht:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
          />
      </label>

      </form>

      {preview && (
        <div>
          <h4>Vorschau:</h4>
          <p>{title}</p>
          <img src={preview} alt="Preview" width="400" />
          <p>{description}</p>

        </div>
      )}
<hr />
      {message && <h3 style={{color: "skyblue"}}>{message}</h3>}
    </div>
  );
};

export default UploadForm;