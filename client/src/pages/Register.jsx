import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md text-center">
        <img src={logo} alt="Logo" className="h-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6">Register to FoodWeb!</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block mb-4 border p-2 w-full rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block mb-4 border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};
