import { useLocation, useNavigate } from 'react-router-dom';

export const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { booking, address, phone } = state || {};

  if (!booking || !address || !phone) return <p>Missing booking data.</p>;

  const handleCheckout = () => {
    alert('Payment Successful!');
    navigate('/dashboard'); // Redirect or confirmation page
  };

  const handleCancel = () => {
    alert('Booking Cancelled.');
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
      <p><strong>Staff:</strong> {booking.staffName}</p>
      <p><strong>Role:</strong> {booking.role}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Phone:</strong> {phone}</p>

      <div className="mt-6 space-x-4">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
