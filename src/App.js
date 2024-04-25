import { useState, useEffect } from "react";
import apiClient from "./api/apiClient";
import DataTable from "./components/DataTable";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);

  useEffect(() => {
    apiClient
      .get("/invoices/pending")
      .then((response) => response.data)
      .then((data) => {
        setInvoices(data.filter((item) => item.type === "received"));
        setCreditNotes(data.filter((item) => item.type === "credit_note"));
      });
  }, []);

  console.log("invoices", invoices);
  console.log("creditNotes", creditNotes);

  const usdToClp = 949; // This is a mock value, we could fetch the real value from an API

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center py-8">
        Selecciona una factura
      </h1>
      <div className="px-8 pt-6 pb-8 mb-4">
        <DataTable data={invoices} usdToClp={usdToClp} />
      </div>
    </div>
  );
}

export default App;
