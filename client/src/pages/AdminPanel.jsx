import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { ref, onValue, set, push } from 'firebase/database';
import { useAuth } from '../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [staff, setStaff] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'chef',
    isAvailable: true
  });

  // 🔐 Check admin access
  useEffect(() => {
    if (!user) return;
    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snap) => {
      const data = snap.val();
      if (!data || data.role !== 'admin') {
        alert('Access denied!');
        navigate('/dashboard');
      } else {
        setRole('admin');
      }
    });
  }, [user]);

  // 📥 Fetch staff and bookings (only if admin)
  useEffect(() => {
    if (role !== 'admin') return;

    const staffRef = ref(db, 'staff');
    const bookingsRef = ref(db, 'bookings');

    onValue(staffRef, (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({ id, ...item }));
      setStaff(list);
    });

    onValue(bookingsRef, (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({ id, ...item }));
      setBookings(list);
    });
  }, [role]);

  // ➕ Add new staff
  const handleAddStaff = async () => {
    const newRef = push(ref(db, 'staff'));
    await set(newRef, newStaff);
    setNewStaff({ name: '', role: 'chef', isAvailable: true });
  };

  // 🔁 Toggle availability
  const toggleAvailability = async (id, current) => {
    await set(ref(db, `staff/${id}/isAvailable`), !current);
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Staff */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add Staff</h2>
        <input
          type="text"
          placeholder="Name"
          value={newStaff.name}
          onChange={(e) =>
            setNewStaff({ ...newStaff, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <select
          value={newStaff.role}
          onChange={(e) =>
            setNewStaff({ ...newStaff, role: e.target.value })
          }
          className="border p-2 mr-2"
        >
          <option value="chef">Chef</option>
          <option value="bartender">Bartender</option>
          <option value="helper">Helper</option>
        </select>
        <button
          onClick={handleAddStaff}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Staff List */}
      <h2 className="text-lg font-semibold mb-2">All Staff</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {staff.map((s) => (
          <div key={s.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-sm capitalize">{s.role}</p>
            <p className="text-sm">
              Available: {s.isAvailable ? 'Yes' : 'No'}
            </p>
            <button
              onClick={() => toggleAvailability(s.id, s.isAvailable)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Toggle Availability
            </button>
          </div>
        ))}
      </div>

      {/* All Bookings */}
      <h2 className="text-lg font-semibold mb-2">All Bookings</h2>
      <ul className="list-disc pl-6">
        {bookings.map((b) => (
          <li key={b.id}>
            {b.staffName} ({b.role}) → User: {b.userId} —{' '}
            {new Date(b.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
