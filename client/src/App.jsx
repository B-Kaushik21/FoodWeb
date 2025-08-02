// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import { Cart } from './pages/Cart';
import { Payment } from './pages/Payment';
import { Menu } from './pages/Menu';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      
      {/* Public Page with Layout */}
      <Route path="/home" element={<Layout><Home /></Layout>} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout><AdminPanel /></Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
