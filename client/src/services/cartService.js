// services/cartService.js
import { ref, set, get, remove } from 'firebase/database';
import { db } from './firebase';

export const updateCartItem = async (userId, item) => {
  const cartRef = ref(db, `carts/${userId}/${item.name}`);
  await set(cartRef, {
    name: item.name,
    price: item.price,
    qty: item.qty,
  });
};
export const removeCartItem = async (userId, itemName) => {
  const itemRef = ref(db, `carts/${userId}/${itemName}`);
  await remove(itemRef);
};
export const getCartItems = async (userId) => {
  const cartRef = ref(db, `carts/${userId}`);
  const snapshot = await get(cartRef);
  return snapshot.exists() ? snapshot.val() : {};
};
import { push } from 'firebase/database';

export const checkoutCart = async (userId) => {
  const cartItems = await getCartItems(userId);
  const bookingsRef = ref(db, `bookings`);
  const time = new Date().toISOString();

  // Push each item as a booking
  for (let itemName in cartItems) {
    const item = cartItems[itemName];
    await push(bookingsRef, {
      userId,
      itemName: item.name,
      quantity: item.qty,
      price: item.price,
      total: item.price * item.qty,
      date: time,
    });
  }

  // Clear the cart
  await set(ref(db, `carts/${userId}`), null);
};

