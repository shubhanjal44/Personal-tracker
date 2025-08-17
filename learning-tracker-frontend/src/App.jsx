import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // you will create this next
import Register from './pages/Register';
const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute isAuthenticated={!!token} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* add more protected routes here */}
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
