import { useState, useEffect } from "react";
import apiClient from "./api/apiClient";
import DataTable from "./components/DataTable";
import SuccessModal from "./components/SuccessModal";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    apiClient
      .get("/invoices/pending")
      .then((response) => response.data)
      .then((data) => {
        setInvoices(data.filter((item) => item.type === "received"));
        setCreditNotes(data.filter((item) => item.type === "credit_note"));
      });
  }, []);

  const usdToClp = 949; // This is a mock value, we could fetch the real value from an API

  // Filter credit notes that belong to the selected invoice

  const relatedCreditNotes = creditNotes.filter(
    (creditNote) => creditNote.reference === selectedInvoice
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setSelectedCreditNote(null);
  };

  const handleAssign = () => {
    // Here we could make an API call or a mutation to assign the credit note to the invoice
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center py-8">
        Selecciona una factura
      </h1>
      <div className="px-8 pt-6 pb-8 mb-4">
        <DataTable
          data={invoices}
          usdToClp={usdToClp}
          selectedRow={selectedInvoice}
          setSelectedRow={setSelectedInvoice}
        />
      </div>
      {selectedInvoice && (
        <div className="px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold text-center py-4">
            Selecciona una nota de crédito
          </h2>
          <DataTable
            data={relatedCreditNotes}
            usdToClp={usdToClp}
            selectedRow={selectedCreditNote}
            setSelectedRow={setSelectedCreditNote}
          />
          {selectedCreditNote && (
            <button
              className="block mx-auto mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAssign}
            >
              Asignar
            </button>
          )}
        </div>
      )}
      <SuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default App;
