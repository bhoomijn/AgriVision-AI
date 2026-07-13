

import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/crop-health")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  return (
    <div>
      <h1>AgriVision AI</h1>
      {data ? (
        <p>{data.message} (Status: {data.status})</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
