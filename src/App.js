import { useState, useEffect } from "react";
import apiClient from "./api/apiClient";
import DataTable from "./components/DataTable";
import SuccessModal from "./components/SuccessModal";
import SummaryTable from "./components/SummaryTable";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState(null);
  const [selectedCreditNotes, setSelectedCreditNotes] = useState([]);
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
    (creditNote) => creditNote.reference === selectedInvoices
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoices(null);
    setSelectedCreditNotes([]);
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
          selectedRows={selectedInvoices}
          setSelectedRows={setSelectedInvoices}
        />
      </div>
      {selectedInvoices && (
        <div className="px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold text-center py-4">
            Selecciona una nota de crédito
          </h2>
          <DataTable
            data={relatedCreditNotes}
            usdToClp={usdToClp}
            selectedRows={selectedCreditNotes}
            setSelectedRows={setSelectedCreditNotes}
            multipleSelect={true}
          />
          {selectedCreditNotes &&
            relatedCreditNotes.length > 0 &&
            selectedCreditNotes.length > 0 && (
              <div className="px-8 pt-6 pb-8 mb-4">
                <SummaryTable
                  invoice={invoices.find(
                    (invoice) => invoice.id === selectedInvoices
                  )}
                  creditNotes={relatedCreditNotes.filter((creditNote) =>
                    selectedCreditNotes.includes(creditNote.id)
                  )}
                  usdToClp={usdToClp}
                />
                <button
                  className="block mx-auto mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAssign}
                >
                  Asignar
                </button>
              </div>
            )}
        </div>
      )}
      <SuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default App;
