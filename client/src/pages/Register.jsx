import { useState } from 'react';
import { useAuth } from '../contexts/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block mb-2 border p-2 w-full"/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block mb-4 border p-2 w-full"/>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
        <p className="mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>

    </form>
  );
};
