import React from 'react';
import { NavLink } from 'react-router-dom';

function SecondaryNav() {
  return (
    <div className="secondary-nav">
      <div className="container">
        <ul className="sec-nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>HOME</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>PRODUCTS</NavLink></li>
          <li><NavLink to="/products?offer=true" className={({ isActive }) => isActive ? 'active' : ''}>SPECIAL OFFERS</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>CONTACT</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default SecondaryNav;
