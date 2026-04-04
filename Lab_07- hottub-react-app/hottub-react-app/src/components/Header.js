import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartCount } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1>HOTSPRING<sup>®</sup><span>Portable Spas</span></h1>
            </Link>
          </div>
          <div className="cart-section">
            <div className="cart-box" onClick={() => navigate('/cart')}>
              <span className="cart-icon">🛒</span>
              <span className="cart-text">
                My Cart: <span className="cart-count">{cartCount} Item(s)</span>
              </span>
              <span>▼</span>
            </div>
          </div>
        </div>
      </header>

      <nav>
        <div className="container">
          <ul className="nav-links">
            <li><Link to="/products">CATEGORY</Link></li>
            <li><span className="nav-divider">|</span></li>
            <li><Link to="/products">BRAND</Link></li>
            <li><span className="nav-divider">|</span></li>
            <li><Link to="/about">INFO</Link></li>
          </ul>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>SEARCH</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
