import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import TransactionForm from '../Component/TransactionForm';
import TransactionList from '../Component/TransactionList';

const TransactionsPage = () => {
  const {
    data: transactions,
    loading,
    error,
    refetch,
    request,
  } = useFetch('http://localhost:5000/api/transactions');

  const [editing, setEditing] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = async (transaction, isEdit) => {
    setErrorMsg('');
    const url = isEdit
      ? `http://localhost:5000/api/transactions/${transaction._id}`
      : 'http://localhost:5000/api/transactions';

    const method = isEdit ? 'PUT' : 'POST';

    const result = await request({ url, method, body: transaction });

    if (result) {
      refetch();
      setEditing(null);
    } else {
      setErrorMsg('Failed to save transaction');
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:5000/api/transactions/${id}`;
    const result = await request({ url, method: 'DELETE' });
    if (result) refetch();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      {errorMsg && <div className="text-red-600 mb-4">{errorMsg}</div>}
      {error && <div className="text-red-600 mb-4">{error.message}</div>}

      <TransactionForm
        onSaveComplete={handleSave}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <TransactionList
          transactions={transactions}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
