import { useAuth } from '../contexts/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // ✅ make sure this path exists

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-green-100 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
        <img src={logo} alt="logo" className="h-10 w-10 rounded" />
        <h1 className="text-xl font-bold text-gray-800">FoodWeb</h1>
      </div>

      {/* Right: Nav Links */}
      <div className="flex items-center gap-6">
        <Link to="/home" className="inline-block bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 transition">
            Home
        </Link>

        <Link to="/menu" className="inline-block bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700 transition">Menu</Link>

        {user ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:inline">
              Hello, <strong>{user.email?.split('@')[0]}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/register" className="text-green-600 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
