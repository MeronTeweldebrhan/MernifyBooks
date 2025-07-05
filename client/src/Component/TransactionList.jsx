const TransactionList = ({ transactions = [], onEdit, onDelete }) => {
  if (!Array.isArray(transactions)) return <div>No transactions found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">From Account</th>
            <th className="border border-gray-300 px-4 py-2 text-left">From Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">To Account</th>
            <th className="border border-gray-300 px-4 py-2 text-left">To Type</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{tx.fromAccount?.name || tx.fromAccount}</td>
              <td className="border border-gray-300 px-4 py-2">{tx.fromType}</td>
              <td className="border border-gray-300 px-4 py-2">{tx.toAccount?.name || tx.toAccount}</td>
              <td className="border border-gray-300 px-4 py-2">{tx.toType}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">${tx.amount.toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">{tx.description}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2 flex space-x-2 justify-center">
                <button
                  onClick={() => onEdit(tx)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(tx._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
