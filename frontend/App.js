import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [cropData, setCropData] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/crop-health")
      .then(res => res.json())
      .then(data => {
        setCropData(data);
        setChartData(prev => [
          ...prev,
          { day: prev.length + 1, score: data.score }
        ]);
      })
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h1>🌱 AgriVision AI Dashboard</h1>
      {cropData ? (
        <div>
          <p>Status: {cropData.status}</p>
          <p>Message: {cropData.message}</p>
          <p>Score: {cropData.score}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <LineChart width={400} height={300} data={chartData}>
        <Line type="monotone" dataKey="score" stroke="#82ca9d" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default App;
