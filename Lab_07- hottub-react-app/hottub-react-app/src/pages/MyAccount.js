import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

function MyAccount() {
  const accountLinks = [
    { label: 'My Orders', icon: '📦', path: '/order-history', desc: 'View and track your orders' },
    { label: 'Edit Account', icon: '👤', path: '/edit-account', desc: 'Update your personal info' },
    { label: 'Edit Billing Address', icon: '💳', path: '/edit-billing', desc: 'Manage billing address' },
    { label: 'Edit Shipping Address', icon: '🚚', path: '/edit-shipping', desc: 'Manage shipping address' },
    { label: 'My Wishlist', icon: '❤️', path: '/products', desc: 'View saved products' },
    { label: 'Shopping Cart', icon: '🛒', path: '/cart', desc: 'View items in your cart' },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'My Account' }]} />
        <h1 className="page-title">My Account</h1>
        <div className="content-box">
          <div className="alert alert-info">Welcome back! You are logged in as <strong>user@example.com</strong></div>
          <div className="section-title">Account Dashboard</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 16 }}>
            {accountLinks.map(l => (
              <Link key={l.label} to={l.path} style={styles.accountCard}>
                <div style={{ fontSize: 28 }}>{l.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '13px', marginTop: 8, color: '#333' }}>{l.label}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: 4 }}>{l.desc}</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/login" className="btn btn-gray">SIGN OUT</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  accountCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 20, border: '1px solid #ddd', background: '#fafafa', textDecoration: 'none', transition: 'background 0.2s' },
};

export default MyAccount;
