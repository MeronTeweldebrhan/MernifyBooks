import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import LoginPage from './Pages/LoginPage';
import TransactionsPage from './Pages/TransactionsPage';
import ChartOfAccountsPage from './Pages/ChartofAccountsPage';
import DashboardPage from './Component/DashboardPage';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        // ✅ Show Navbar + Footer only when logged in
        <>
          <Navbar />
          <main className="min-h-screen bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/chart-of-accounts" element={<ChartOfAccountsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
