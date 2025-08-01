import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { useAuth } from '../contexts/Authcontext'
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const [role, setRole] = useState('');

    useEffect(() => {
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snap) => {
        const data = snap.val();
        setRole(data?.role || '');
      });
    }, [user]);


  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Fetch available staff
  useEffect(() => {
    const staffRef = ref(db, 'staff');
    onValue(staffRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({
        id,
        ...item
      }));
      setStaffList(list.filter((s) => s.isAvailable));
    });
  }, []);

  // Fetch user's bookings
  useEffect(() => {
    const bookingsRef = ref(db, 'bookings');
    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data)
        .map(([id, item]) => ({ id, ...item }))
        .filter((b) => b.userId === user?.uid);
      setMyBookings(list);
    });
  }, [user]);

  // Book a staff member
  const handleBooking = async (staff) => {
    const newBookingRef = push(ref(db, 'bookings'));
    await set(newBookingRef, {
      userId: user.uid,
      staffId: staff.id,
      staffName: staff.name,
      role: staff.role,
      date: new Date().toISOString()
    });

    // Set staff as unavailable
    await set(ref(db, `staff/${staff.id}/isAvailable`), false);
    alert(`Booked ${staff.name}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Available Staff</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {staffList.map((staff) => (
          <div key={staff.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{staff.name}</h3>
            <p className="text-gray-600 capitalize">{staff.role}</p>
            <button
              onClick={() => handleBooking(staff)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-2">My Bookings</h2>
      <ul className="list-disc pl-6">
        {myBookings.map((b) => (
          <li key={b.id}>
            {b.staffName} ({b.role}) – {new Date(b.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
