import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <span className="support">
          Call for Customer support: <span>020 38989565</span>
        </span>
        <div className="top-links">
          <Link to="/my-account">My Account</Link>
          <Link to="/cart">Wishlist</Link>
          <Link to="/checkout">To Checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
