import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData);
      onUploadSuccess();
      setFile(null);
      setError(null);
    } catch (error) {
      setError('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Credit Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="upload-area">
          <label className="file-input-label">
            {file ? file.name : 'Choose XML File'}
            <input
              type="file"
              accept=".xml"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setError(null);
              }}
              className="file-input"
            />
          </label>
          {file && (
            <button 
              type="submit" 
              className="upload-button"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Report'}
            </button>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default FileUpload;