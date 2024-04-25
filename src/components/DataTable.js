function DataTable({ data, usdToClp }) {
  const formatAmount = (amount, currency) => {
    if (currency === "USD") {
      const convertedAmount = (amount * usdToClp).toLocaleString();
      return `${convertedAmount} CLP ($${amount.toLocaleString()} USD)`;
    }
    return `${amount.toLocaleString()} CLP`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center bg-gray-100 border-b">
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

export default DataTable;
