/* eslint-disable react-refresh/only-export-components */

// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

let logoutTimer;
let inactivityTimer;
let warningTimer;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    clearTimeout(logoutTimer);
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);
    removeActivityListeners();
  };

  const startWarningCountdown = () => {
    const userConfirmed = window.confirm(
      'You’ve been inactive. Click "OK" to stay logged in.\nIf you don’t respond, you will be logged out in 60 seconds.'
    );

    if (userConfirmed) {
      resetInactivityTimer(); // user is active again
    } else {
      // wait 60 seconds, then logout if no action
      warningTimer = setTimeout(() => {
        logout();
      }, 60 * 1000); // 60 seconds
    }
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);
    inactivityTimer = setTimeout(() => {
      startWarningCountdown();
    }, 5 * 60 * 1000); // 5 minutes
  };

  const addActivityListeners = () => {
    ['click', 'mousemove', 'keydown', 'scroll'].forEach(event =>
      window.addEventListener(event, resetInactivityTimer)
    );
  };

  const removeActivityListeners = () => {
    ['click', 'mousemove', 'keydown', 'scroll'].forEach(event =>
      window.removeEventListener(event, resetInactivityTimer)
    );
  };

  const login = (jwtToken) => {
    const decoded = jwtDecode(jwtToken);
    const expiresAt = decoded.exp * 1000;
    const remainingTime = expiresAt - Date.now();

    sessionStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setIsLoggedIn(true);

    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logout();
    }, remainingTime);

    resetInactivityTimer();
    addActivityListeners();
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        if (decoded.exp * 1000 > Date.now()) {
          login(storedToken);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      }
    }

    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      removeActivityListeners();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};