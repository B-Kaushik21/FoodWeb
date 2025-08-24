import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-gray-100">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="FoodWeb Logo" className="h-20" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Join <span className="text-green-600">FoodWeb</span> Today!
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <FaUserPlus /> Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-green-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};
