import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserRole } from '../services/AuthService';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getCurrentUserRole();
    setUserRole(role);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Online Pet Shop</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Log-Out</Link>
            </li>
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;