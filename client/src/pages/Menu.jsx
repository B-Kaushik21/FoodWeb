// src/pages/Menu.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems, updateCartItem } from '../services/cartService';
import { useAuth } from '../contexts/Authcontext';

export const Menu = () => {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  const categories = {
    Indian: [
      { name: 'Paneer Butter Masala', price: 250, image: '/images/paneer.jpg' },
      { name: 'Chicken Biryani', price: 300, image: '/images/biryani.jpg' }
    ],
    Chinese: [
      { name: 'Fried Rice', price: 200, image: '/images/fried_rice.jpg' },
      { name: 'Manchurian', price: 180, image: '/images/manchurian.jpg' }
    ],
    Starters: [
      { name: 'Soup', price: 120, image: '/images/soup.jpg' },
      { name: 'Fries', price: 100, image: '/images/fries.jpg' }
    ],
    'Main Course': [
      { name: 'Dal Tadka', price: 150, image: '/images/dal.jpg' },
      { name: 'Fish Curry', price: 280, image: '/images/fish.jpg' }
    ],
    Breads: [
      { name: 'Roti', price: 20, image: '/images/roti.jpg' },
      { name: 'Naan', price: 30, image: '/images/naan.jpg' }
    ],
    Drinks: [
      { name: 'Lassi', price: 60, image: '/images/lassi.jpg' },
      { name: 'Soda', price: 40, image: '/images/soda.jpg' }
    ],
    Desserts: [
      { name: 'Gulab Jamun', price: 90, image: '/images/gulab.jpg' },
      { name: 'Ice Cream', price: 100, image: '/images/icecream.jpg' }
    ]
  };

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCartItems(user.uid);
      setCart(items);
    };
    if (user?.uid) fetchCart();
  }, [user]);

  const increaseQty = async (item) => {
    const updatedQty = (cart[item.name]?.qty || 0) + 1;
    const updatedItem = {
      name: item.name,
      price: item.price,
      qty: updatedQty
    };
    await updateCartItem(user.uid, updatedItem);
    setCart((prev) => ({
      ...prev,
      [item.name]: updatedItem
    }));
  };

  const decreaseQty = async (item) => {
    const currentQty = cart[item.name]?.qty || 0;
    if (currentQty <= 1) {
      const { [item.name]: _, ...rest } = cart;
      await updateCartItem(user.uid, { name: item.name, qty: 0 });
      setCart(rest);
    } else {
      const updatedItem = {
        name: item.name,
        price: item.price,
        qty: currentQty - 1
      };
      await updateCartItem(user.uid, updatedItem);
      setCart((prev) => ({
        ...prev,
        [item.name]: updatedItem
      }));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu</h1>
        <button
          onClick={() => navigate('/cart', { state: { cart } })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Cart ({Object.keys(cart).length})
        </button>
      </div>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.name} className="border p-4 rounded shadow bg-white">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover mb-2 rounded" />
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button onClick={() => decreaseQty(item)} className="bg-red-500 text-white px-2 rounded">−</button>
                  <span>{cart[item.name]?.qty || 0}</span>
                  <button onClick={() => increaseQty(item)} className="bg-green-500 text-white px-2 rounded">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
