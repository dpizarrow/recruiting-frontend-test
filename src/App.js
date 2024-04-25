import { useState, useEffect } from "react";
import apiClient from "./api/apiClient";
import DataTable from "./components/DataTable";

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
      <h1 className="text-2xl font-bold text-center py-8">
        Selecciona una factura
      </h1>
      <div className="px-8 pt-6 pb-8 mb-4">
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;
