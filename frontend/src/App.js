// src/App.js
import React, { useState } from "react";
import PDFViewer from "./components/PDFViewer";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    const role = prompt(
      "Enter 'admin' to have control or 'viewer' for read-only access:"
    );
    setIsAdmin(role === "admin");
  };

  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold my-4">PDF Co-Viewer</h1>
      {!isAdmin && (
        <button onClick={handleLogin} className="btn mx-auto my-4 block">
          Login as Admin
        </button>
      )}
      <PDFViewer isAdmin={isAdmin} />
    </div>
  );
}

export default App;
