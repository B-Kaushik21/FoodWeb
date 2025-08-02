# 🍽️ FoodWeb

FoodWeb is a full-stack web application where users can book chefs, waitstaff, and catering services for events and also order food items from a curated menu. It offers seamless booking, cart, and checkout functionality — all powered by Firebase.

---

## 🔧 Tech Stack

- **Frontend:** React, TailwindCSS, React Router
- **Backend/Database:** Firebase Realtime Database, Firebase Authentication

---

## 🚀 Features

### User Features
- 🔐 Login / Register using Firebase Auth
- 👨‍🍳 Book staff (chefs, waiters, etc.)
- 📦 Add food items to cart from menu
- 🧾 View cart, adjust quantities, and checkout
- 📄 View bookings made (linked to user ID)
- 🧭 Navigation between Home, Dashboard, Menu, and Cart

### Admin Features (Future Scope)
- 🧑‍💻 Add or manage staff members
- 📊 View bookings across users

---
```
src/
│
├── assets/ # Logo and image files
├── components/ # Reusable UI components (Navbar, Footer, etc.)
├── contexts/ # Auth context
├── pages/ # Route pages: Home, Login, Register, Dashboard, Menu, Cart
├── services/ # Firebase config and cart utilities
└── App.jsx # Main component with routes
```

---

## 🔑 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Enable **Realtime Database**
5. Copy your Firebase config to `src/services/firebase.js`:

```js
// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
```
# Clone the repo
git clone [https://github.com/your-username/foodweb.git](https://github.com/B-Kaushik21/FoodWeb)

# Navigate into the project
cd foodweb

# Install dependencies
npm install

# Start the development server
npm run dev


## 📂 Project Structure

