import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>

      <h2 className="text-3xl font-bold mb-6">Welcome to Your MernifyBooks</h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/transactions')}
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
           Transactions
        </button>

        <button
          onClick={() => navigate('/chart-of-accounts')}
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
           Chart of Accounts
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
