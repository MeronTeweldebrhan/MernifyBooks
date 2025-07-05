import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-300">MernifyBooks</Link>
      </div>

      <ul className="flex space-x-6 items-center">
        <li><Link to="/" className="hover:text-gray-300">Dashboard</Link></li>
        <li><Link to="/transactions" className="hover:text-gray-300">Transactions</Link></li>
        <li><Link to="/reports" className="hover:text-gray-300">Report</Link></li>
        <li><Link to="/customers" className="hover:text-gray-300">Customer</Link></li>
        <li><Link to="/vendors" className="hover:text-gray-300">Vendor</Link></li>
        <li><Link to="/help" className="hover:text-gray-300">Help</Link></li>
        <li><Link to="/files" className="hover:text-gray-300">Files</Link></li>

        <li className="relative group cursor-pointer">
          <span className="hover:text-gray-300">Options ▼</span>
          <ul className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg w-40 z-50">
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </button>
            </li>
           <li><Link to="/chart-of-accounts" className="hover:text-gray-300">Files</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
