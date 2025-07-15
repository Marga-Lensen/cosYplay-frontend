import { useState} from "react";
import Blossoms from "../../components/Blossoms";
import UploadForm from './UploadForm';
import FileList from './FileList';
import { uploadFile, getFiles } from '../../api/uploadService.js';

// import './App.css';

function CosYpost() {
  const [view, setView] = useState("upload"); // 'upload' or 'files'

  return (
    <div className="post-container">
      <Blossoms />
      <div className="app-container">
        <h1>cosYpost</h1>

        <div className="toggle-buttons">
          <button
            onClick={() => setView("upload")}
            className={view === "upload" ? "active" : ""}
          >
            Posten
          </button>
          <button
            onClick={() => setView("files")}
            className={view === "files" ? "active" : ""}
          >
            Feed
          </button>
        </div>

        <div className="view-container">
          {view === "upload" ? <UploadForm uploadFile={uploadFile} setView={setView}/> : <FileList getFiles={getFiles} />}
        </div>
      </div>
    </div>
  );
}

export default CosYpost;
