import { useState, useEffect } from "react";
import apiClient from "./api/apiClient";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiClient
      .get("/invoices/pending")
      .then((response) => response.data)
      .then((data) => {
        setData(data);
      });
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-10">Hello World</h1>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

export default App;
