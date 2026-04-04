import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import BrandsBar from '../components/BrandsBar';
import Footer from '../components/Footer';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar />
      <Header />
      <div className="page-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '120px', fontWeight: 900, color: '#cc0000', fontFamily: 'Oswald, sans-serif', lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '28px', color: '#222', margin: '16px 0 12px' }}>Page Not Found</h1>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: 8 }}>Oops! The page you are looking for doesn't exist or has been moved.</p>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: 32 }}>Maybe you were looking for one of our hot tubs instead? 🛁</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-red" onClick={() => navigate(-1)}>← GO BACK</button>
            <Link to="/" className="btn btn-gray">🏠 HOME</Link>
            <Link to="/products" className="btn btn-outline">BROWSE PRODUCTS</Link>
            <Link to="/contact" className="btn btn-outline">CONTACT US</Link>
          </div>
          <div style={{ marginTop: 40, padding: 20, background: 'rgba(245,245,245,0.9)', border: '1px solid #ddd', display: 'inline-block' }}>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>Popular Pages:</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[['Home', '/'], ['Products', '/products'], ['Cart', '/cart'], ['Login', '/login'], ['About Us', '/about'], ['Contact', '/contact']].map(([l, p]) => (
                <Link key={l} to={p} style={{ fontSize: '12px', color: '#cc0000' }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BrandsBar />
      <Footer />
    </>
  );
}
export default NotFound;
