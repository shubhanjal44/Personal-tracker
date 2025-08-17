import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
