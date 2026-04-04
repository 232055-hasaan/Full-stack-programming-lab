import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import Breadcrumb from '../components/Breadcrumb';
import RelatedCarousel from '../components/RelatedCarousel';

function StarRating({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#f0a500' : '#ddd', fontSize: 14 }}>★</span>
      ))}
    </span>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [mainImg, setMainImg] = useState(product ? product.img : '');
  const [activeTab, setActiveTab] = useState('details');
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="content-box" style={{ textAlign: 'center', paddingTop: 40 }}>
            <h2>Product Not Found</h2>
            <Link to="/products" className="btn btn-red" style={{ marginTop: 16, display: 'inline-block' }}>Back to Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    alert(`${qty}x "${product.shortName}" added to cart!`);
  };

  const tabs = [
    { key: 'details', label: 'Details' },
    { key: 'specs', label: 'Quick Specs' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'qa', label: 'Q & A' },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }, { label: product.shortName }]} />
        <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '18px', fontWeight: 700, color: '#222', marginBottom: 4 }}>{product.name}</h2>
        <p style={{ fontSize: '11px', color: '#888', marginBottom: 14 }}>Model: {product.id}00XL | Category: {product.category}</p>

        <div style={styles.layout}>
          {/* Left: Images + Tabs */}
          <div style={styles.left}>
            <div style={styles.mainImgWrap}>
              <img src={mainImg} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={styles.thumbs}>
              {product.thumbs.map((t, i) => (
                <img key={i} src={t} alt="" onClick={() => setMainImg(t.replace('70','300').replace('55','220'))}
                  style={{ ...styles.thumb, border: mainImg.includes(t.split('?')[0].slice(-20)) ? '2px solid #cc0000' : '2px solid #ddd' }} />
              ))}
            </div>

            {/* Tabs */}
            <div style={{ marginTop: 18 }}>
              <div className="tabs">
                {tabs.map(t => (
                  <button key={t.key} className={`tab-btn${activeTab === t.key ? ' active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>
                ))}
              </div>
              {activeTab === 'details' && (
                <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.7 }}>
                  <p><strong>Energy Star Rated - No</strong></p>
                  <p style={{ marginTop: 8 }}>{product.desc}</p>
                  <p style={{ marginTop: 8 }}>This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.</p>
                </div>
              )}
              {activeTab === 'specs' && (
                <table>
                  <thead><tr><th>Specification</th><th>Value</th></tr></thead>
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}><td>{k}</td><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'accessories' && <p style={{ fontSize: '12px', color: '#666' }}>No accessories available for this product.</p>}
              {activeTab === 'reviews' && <p style={{ fontSize: '12px', color: '#666' }}>{product.reviews} Reviews — <StarRating rating={product.rating} /></p>}
              {activeTab === 'qa' && <p style={{ fontSize: '12px', color: '#666' }}>No Q&A yet. Be the first to ask a question!</p>}
            </div>
          </div>

          {/* Middle: Info */}
          <div style={styles.mid}>
            <div><StarRating rating={product.rating} /> <span style={{ fontSize: '11px', color: '#337ab7' }}>({product.reviews} reviews)</span></div>
            <p style={{ fontSize: '11px', color: '#555', margin: '6px 0 2px' }}>Retail Price <s>${product.retailPrice.toLocaleString()}.00</s></p>
            <p style={{ fontSize: '11px', color: '#555' }}><strong>Sale Price</strong></p>
            <div style={{ fontSize: '26px', fontWeight: 700, color: '#cc0000', margin: '4px 0 8px' }}>${product.price.toLocaleString()}.00</div>
            <a href="#!" style={{ fontSize: '11px', color: '#337ab7', display: 'block', marginBottom: 12 }}>Low Price Guarantee</a>
            <div style={{ fontSize: '12px', color: '#555', lineHeight: 2, marginBottom: 12 }}>
              {Object.entries(product.specs).slice(0, 5).map(([k, v]) => (
                <p key={k}><strong>{k}</strong><br />{v}</p>
              ))}
              <p style={{ color: product.inStock ? '#4a9a4a' : '#cc0000', fontWeight: 700, marginTop: 8 }}>
                {product.inStock ? '✓ In Stock (available)' : '✗ Out of Stock'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <label style={{ fontSize: '12px' }}>Qty:</label>
              <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: 50, padding: '4px 6px', border: '1px solid #ccc', fontSize: '13px' }} />
            </div>
            <button className="btn-cart" onClick={handleAddToCart} disabled={!product.inStock}>
              🛒 ADD TO CART
            </button>
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: '11px', color: '#888', marginBottom: 5 }}>Download Resources</p>
              <ul style={{ listStyle: 'none', fontSize: '11px' }}>
                <li><a href="#!" style={{ color: '#cc0000' }}>📄 Full Line Brochure</a></li>
                <li><a href="#!" style={{ color: '#cc0000' }}>📄 Owner's Manual</a></li>
                <li><a href="#!" style={{ color: '#cc0000' }}>📄 Specifications Sheet</a></li>
              </ul>
            </div>
          </div>

          {/* Right: Price Calculator */}
          <div style={styles.right}>
            <div style={styles.calculator}>
              <h4 style={{ fontWeight: 700, marginBottom: 10, fontSize: '13px' }}>Price Calculator</h4>
              {[
                ['Interior Color', ['Blue', 'Grey', 'White']],
                ['Outside Shell Color', ['Espresso', 'Silver', 'Black']],
                ['Circulation Pump', ['Yes', 'No']],
                ['Polar Foam', ['Yes', 'No']],
                ['Cover / Steps', ['Yes', 'No']],
                ['Extra Filter Sets', ['Yes', 'No']],
                ['Deluxe Cover Lifter', ['Yes', 'No']],
                ['Salt Water System', ['Yes', 'No']],
                ['TV/DVD/Entertainment', ['Yes', 'No']],
                ['Jets', ['90', '120']],
                ['Waterfall', ['Yes', 'No']],
              ].map(([label, opts]) => (
                <div key={label} style={styles.calcRow}>
                  <label style={{ fontSize: '10px', color: '#555', flex: 1 }}>{label}:</label>
                  <select style={{ fontSize: '10px', padding: '2px', flex: 1 }}>
                    <option>-</option>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: '13px', fontWeight: 700, color: '#cc0000', textAlign: 'center' }}>
                Total: ${product.price.toLocaleString()}.00
              </div>
              <button className="btn-cart" style={{ width: '100%', margin: '8px 0', justifyContent: 'center' }} onClick={handleAddToCart}>
                🛒 ADD TO CART
              </button>
            </div>
          </div>
        </div>

        <RelatedCarousel />
      </div>
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '280px 1fr 180px', gap: 16, marginBottom: 20 },
  left: {},
  mainImgWrap: { width: '100%', height: 220, overflow: 'hidden', border: '1px solid #ddd', background: '#fff' },
  thumbs: { display: 'flex', gap: 6, marginTop: 8 },
  thumb: { width: 60, height: 48, objectFit: 'cover', cursor: 'pointer' },
  mid: { background: 'rgba(245,245,245,0.9)', border: '1px solid #ddd', padding: 14 },
  right: {},
  calculator: { background: '#fff', border: '1px solid #ddd', padding: 12, fontSize: '11px' },
  calcRow: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 },
};

export default ProductDetail;
