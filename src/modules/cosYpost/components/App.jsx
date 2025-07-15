import { useState } from 'react';
import UploadForm from './UploadForm';
import FileList from './FileList';
import './App.css';

function App() {
  const [view, setView] = useState('upload'); // 'upload' or 'files'

  return (
    <div className="app-container">
      <h1>cosYpost</h1>

      <div className="toggle-buttons">
        <button
          onClick={() => setView('upload')}
          className={view === 'upload' ? 'active' : ''}
        >
          Posten
        </button>
        <button
          onClick={() => setView('files')}
          className={view === 'files' ? 'active' : ''}
        >
          Browsen
        </button>
      </div>

      <div className="view-container">
        {view === 'upload' ? <UploadForm /> : <FileList />}
      </div>
    </div>
  );
}

export default App;
