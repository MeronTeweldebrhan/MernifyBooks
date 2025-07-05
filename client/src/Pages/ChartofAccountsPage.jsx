import { useState } from 'react';
import useFetch from '../hooks/UseFetch';

const ChartOfAccountsPage = () => {
  const [form, setForm] = useState({ name: '', type: 'asset' });
  const [error, setError] = useState('');

  const {
    data: accounts,
    loading,
    error: fetchError,
    request,
    refetch,
  } = useFetch('http://localhost:5000/api/accounts');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await request({
      method: 'POST',
      body: form,
    });

    if (result) {
      setForm({ name: '', type: 'asset' });
      refetch();
    } else {
      setError('Failed to create account');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Chart of Accounts</h2>

      {(error || fetchError) && (
        <div className="text-red-600 mb-4">
          {error || fetchError?.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Account Name"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading accounts...</p>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Existing Accounts</h3>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts?.map((acc) => (
                <tr key={acc._id}>
                  <td className="border px-4 py-2">{acc.name}</td>
                  <td className="border px-4 py-2 capitalize">{acc.type}</td>
                  <td className="border px-4 py-2 text-right">${acc.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChartOfAccountsPage;
