import React from 'react';
import axios from "axios";

import './App.css';

function App() {
  const handleFiles = (files) => {
    const file = files[0];
    const params = { name: file.name, type: file.type };
    axios.get("http://localhost:1111/sign", { params })
      .then(response => {
        const { uploadURL, fileURL } = response.data;
        const headers = { 'Content-Type': file.type };
        return axios.put(uploadURL, file, { headers })
          .then(() => console.log("Upload Complete", fileURL));
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <input 
        name="file" 
        type="file" 
        onChange={(e) => handleFiles(e.target.files)} 
      />
    </div>
  );
}

export default App;
