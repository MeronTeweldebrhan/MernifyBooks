import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const TransactionForm = ({ onSaveComplete, editing, onCancel }) => {
  const [form, setForm] = useState({
    fromAccount: '',
    toAccount: '',
    fromType: '',
    toType: '',
    amount: '',
    description: '',
  });

  // Fetch chart of accounts
  const {
    data: accounts,
    loading: accountsLoading,
    error: accountsError,
  } = useFetch('http://localhost:5000/api/accounts');

  useEffect(() => {
    if (editing) {
      setForm({
        fromAccount: editing.fromAccount?._id || editing.fromAccount || '',
        toAccount: editing.toAccount?._id || editing.toAccount || '',
        fromType: editing.fromType || '',
        toType: editing.toType || '',
        amount: editing.amount || '',
        description: editing.description || '',
      });
    } else {
      setForm({
        fromAccount: '',
        toAccount: '',
        fromType: '',
        toType: '',
        amount: '',
        description: '',
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = {
      ...form,
      amount: Number(form.amount),
      _id: editing?._id,
    };
    onSaveComplete(transaction, !!editing); // pass to parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4 mb-6"
    >
      {accountsError && (
        <div className="text-red-600">{accountsError.message}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <select
          name="fromAccount"
          value={form.fromAccount}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">From Account</option>
          {accounts?.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.name}
            </option>
          ))}
        </select>

        <select
          name="toAccount"
          value={form.toAccount}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">To Account</option>
          {accounts?.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          name="fromType"
          value={form.fromType}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">From Type</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>

        <select
          name="toType"
          value={form.toType}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">To Type</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editing ? 'Update' : 'Add'} Transaction
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
