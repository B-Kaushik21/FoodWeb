import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block mb-2 border p-2 w-full"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block mb-4 border p-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <p className="mt-4">
        Don’t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer underline"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>

    </form>
  );
};
