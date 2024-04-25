import formatAmount from "../lib/formatAmount";

function DataTable({
  data,
  usdToClp,
  selectedRow,
  setSelectedRow,
  multipleSelect,
}) {
  const handleRowSelect = (id) => {
    if (multipleSelect) {
      const isSelected = selectedRow.includes(id);
      if (isSelected) {
        setSelectedRow(selectedRow.filter((rowId) => rowId !== id));
      } else {
        setSelectedRow([...selectedRow, id]);
      }
    } else {
      if (selectedRow === id) {
        setSelectedRow(null);
      } else {
        setSelectedRow(id);
      }
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
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full table-auto rounded-lg">
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={`text-center bg-gray-100 border-b ${
                  multipleSelect && selectedRow.includes(item.id)
                    ? "bg-violet-100 text-indigo-700"
                    : selectedRow === item.id
                    ? "bg-violet-100 text-indigo-700"
                    : ""
                }`}
              >
                <td className="px-4 py-2">
                  <input
                    type="radio"
                    name={multipleSelect ? item.id : "radio"}
                    value={item.id}
                    checked={
                      multipleSelect
                        ? selectedRow.includes(item.id)
                        : selectedRow === item.id
                    }
                    onClick={() => handleRowSelect(item.id)}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </td>
                <td className="px-4 py-2">
                  {item.id} ({item.organization_id})
                </td>
                <td className="px-4 py-2">
                  {formatAmount(item.amount, item.currency, usdToClp)}
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
