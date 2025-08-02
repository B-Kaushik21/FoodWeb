// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { useAuth } from '../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    const staffRef = ref(db, 'staff');
    onValue(staffRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({ id, ...item }));
      setStaffList(list.filter((s) => s.isAvailable));
    });
  }, []);

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

  const handleBooking = async (staff) => {
    const newBookingRef = push(ref(db, 'bookings'));
    await set(newBookingRef, {
      userId: user.uid,
      staffId: staff.id,
      staffName: staff.name,
      role: staff.role,
      date: new Date().toISOString(),
    });

    await set(ref(db, `staff/${staff.id}/isAvailable`), false);
    alert(`Booked ${staff.name}`);
    navigate('/cart', {
    state: {
      cart: {
        [staff.name]: {
          name: staff.name,
          role: staff.role,
          price: staff.price || 500, // Add price if applicable
          qty: 1
        }
      }
    }
});

  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button
          onClick={() => navigate('/home')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Home
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Available Staff</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staffList.map((staff) => (
          <div key={staff.id} className="border p-4 rounded shadow bg-white">
            <img
              src={staff.image || '../assets/male.png'}
              alt={staff.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-bold">{staff.name}</h3>
            <p className="capitalize text-sm text-gray-700">{staff.role}</p>
            <p className="text-sm">Experience: {staff.experience || 'N/A'} years</p>
            <p className="text-sm">Rating: {staff.rating || '4.5'} / 5 ⭐</p>
            <button
              onClick={() => handleBooking(staff)}
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* <h2 className="text-xl font-semibold mt-10 mb-2">My Bookings</h2>
      <ul className="list-disc pl-6">
        {myBookings.map((b) => (
          <li key={b.id}>
            {b.staffName} ({b.role}) – {new Date(b.date).toLocaleString()}
          </li>
        ))}
      </ul> */}
    </div>
  );
};
