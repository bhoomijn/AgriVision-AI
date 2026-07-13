import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/crop-health")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  return (
    <div className="dashboard">
      <h1 className="title">AgriVision AI Dashboard</h1>
      <div className="card">
        {data ? (
          <>
            <p className="message">{data.message}</p>
            <p className="status">Status: {data.status}</p>
          </>
        ) : (
          <p className="message">Loading crop health data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
