import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, onLogout, cartItems, updateCartItem, removeCartItem }) => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand fw-bold logo-text" to="/">Online Pet Shop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/petlist">PetList</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/accessorylist">AccessoryList</Link>
            </li>

            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">ADMIN</Link>
                </li>
              </>
            )}
          </ul>
          <button className="btn btn-outline-warning ms-2" onClick={handleShowCart}>
                Cart ({cartItems.length})
          </button>
          {isAuthenticated && (
            <>
              <button className="btn btn-outline-danger ms-2" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      <Cart
        cartItems={cartItems}
        show={showCart}
        handleClose={handleCloseCart}
        updateCartItem={updateCartItem}
        removeCartItem={removeCartItem}
      />
    </nav>
  );
};

export default Navbar;