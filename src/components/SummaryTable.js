import formatAmount from "../lib/formatAmount";

function SummaryTable({ invoice, creditNotes, usdToClp }) {
  return (
    <div className="px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold text-center py-4">
        Resumen de asignación
      </h2>
      <table className="min-w-full table-auto rounded-lg">
        <tbody>
          <tr className="text-center bg-gray-100 border-b">
            <td className="px-4 py-2">Monto factura</td>
            <td className="px-4 py-2">
              {formatAmount(invoice.amount, invoice.currency, usdToClp)}
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b">
            <td className="px-4 py-2">Notas de crédito</td>
            <td className="px-4 py-2">
              {creditNotes.length > 0
                ? creditNotes.map((creditNote, index) => (
                    <div key={index}>
                      {formatAmount(
                        creditNote.amount,
                        creditNote.currency,
                        usdToClp
                      )}
                    </div>
                  ))
                : "No hay notas de crédito asignadas"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
