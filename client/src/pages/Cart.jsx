import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCartItems,
  checkoutCart,
  removeCartItem,
  updateCartItem
} from '../services/cartService';
import { useAuth } from '../contexts/Authcontext';

export const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.uid) {
        const items = await getCartItems(user.uid);
        setCart(items);
      }
    };
    fetchCart();
  }, [user]);

  const handleIncrease = async (item) => {
    const updatedItem = { ...item, qty: item.qty + 1 };
    await updateCartItem(user.uid, updatedItem);
    setCart((prev) => ({ ...prev, [item.name]: updatedItem }));
  };

  const handleDecrease = async (item) => {
    const updatedQty = item.qty - 1;
    if (updatedQty === 0) {
      await removeCartItem(user.uid, item.name);
      const updatedCart = { ...cart };
      delete updatedCart[item.name];
      setCart(updatedCart);
    } else {
      const updatedItem = { ...item, qty: updatedQty };
      await updateCartItem(user.uid, updatedItem);
      setCart((prev) => ({ ...prev, [item.name]: updatedItem }));
    }
  };

  const handleCheckout = async () => {
    await checkoutCart(user.uid);
    alert('Booking confirmed and cart cleared!');
    setCart({});
    navigate('/dashboard');
  };

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {Object.entries(cart).map(([name, item]) => (
              <li key={name} className="mb-4 flex justify-between items-center border-b pb-2">
                <div>
                  <strong>{item.name}</strong> – ₹{item.price} × {item.qty} = ₹
                  {item.price * item.qty}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-lg font-semibold mb-4">Total: ₹{total}</p>

          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
          >
            Checkout
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            Back to Menu
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};
