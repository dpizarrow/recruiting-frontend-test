function DataTable({ data, usdToClp, selectedRow, setSelectedRow }) {
  const formatAmount = (amount, currency) => {
    if (currency === "USD") {
      const convertedAmount = (amount * usdToClp).toLocaleString();
      return `${convertedAmount} CLP ($${amount.toLocaleString()} USD)`;
    }
    return `${amount.toLocaleString()} CLP`;
  };

  const handleRowSelect = (id) => {
    if (selectedRow === id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(id);
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-4 border border-gray-300 rounded-md">
        No hay datos disponibles
      </div>
    );
  } else {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={`text-center bg-gray-100 border-b ${
                  selectedRow === item.id ? "bg-violet-100 text-indigo-700" : ""
                }`}
              >
                <td className="px-4 py-2">
                  <input
                    type="radio"
                    name={item.id}
                    value={item.id}
                    checked={selectedRow === item.id}
                    onClick={() => handleRowSelect(item.id)}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </td>
                <td className="px-4 py-2">
                  {item.id} ({item.organization_id})
                </td>
                <td className="px-4 py-2">
                  {formatAmount(item.amount, item.currency)}
                </td>
                <td className="px-4 py-2">
                  {item.type === "received" ? "Recibida" : item.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
