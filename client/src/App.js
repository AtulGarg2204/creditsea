import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import CreditReport from './components/CreditReportView';
import './App.css';

function App() {
  const [reportUpdated, setReportUpdated] = useState(false);

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Credit Report Analysis</h1>
        <FileUpload onUploadSuccess={() => setReportUpdated(prev => !prev)} />
        <CreditReport key={reportUpdated} />
      </div>
    </div>
  );
}

export default App;