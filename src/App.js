import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PetList from './components/PetList';
import AccessoryList from './components/AccessoryList';
import AdminDashboard from './components/AdminDashboard';
// import AdminNavbar from './components/AdminNavbar';
import PrivateRoute from './components/PrivateRoute';
import { getCurrentUser, logout } from './services/AuthService';


import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent the default behavior of the button
    logout();
    setIsAuthenticated(false);
  };

  const addToCart = (cartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === cartItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: item.quantity + cartItem.quantity } : item
        );
      } else {
        return [...prevItems, cartItem];
      }
    });
  };

  const updateCartItem = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className='App'>
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          cartItems={cartItems}
          updateCartItem={updateCartItem}
          removeCartItem={removeCartItem}
        />

        <div className="container mt-1">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/petlist" element={<PetList addToCart={addToCart} />} />
            <Route path="/accessorylist" element={<AccessoryList addToCart={addToCart} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            {/* <Route path="/adminnav" element={<AdminNavbar />} /> */}
            <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} roles={['admin']} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;