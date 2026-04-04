import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import RelatedCarousel from '../components/RelatedCarousel';

function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Shopping Cart' }]} />
        <h1 className="page-title">Shopping Cart</h1>
        <div className="content-box">
          <h3 className="section-title">Your Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: 16 }}>🛒 Your cart is empty.</p>
              <Link to="/products" className="btn btn-red">CONTINUE SHOPPING</Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: 8 }}>
                <span>Items in cart</span>
                <span>Items total: {cartItems.reduce((s,i)=>s+i.qty,0)}</span>
              </div>
              {cartItems.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <div style={styles.cartImg}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={styles.cartInfo}>
                    <Link to={`/product/${item.id}`} style={{ fontSize: '12px', fontWeight: 600, color: '#337ab7' }}>{item.name}</Link>
                    <p style={{ fontSize: '11px', color: '#888', marginTop: 4 }}>{item.desc}</p>
                  </div>
                  <div style={styles.cartQty}>
                    <label style={{ fontSize: '11px' }}>Quantity:</label>
                    <select value={item.qty} onChange={e => updateQty(item.id, parseInt(e.target.value))}
                      style={{ marginLeft: 6, padding: '2px 4px', fontSize: '12px' }}>
                      {[1,2,3,4,5,10,20].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <p style={{ fontSize: '11px', color: '#888', marginTop: 4 }}>Standard (7-10 business days)</p>
                  </div>
                  <div style={styles.cartPrice}>${(item.price * item.qty).toLocaleString()}.00</div>
                  <div style={styles.cartActions}>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#cc0000', cursor: 'pointer', fontSize: '11px' }}>Remove</button>
                    {' | '}
                    <Link to={`/product/${item.id}`} style={{ fontSize: '11px' }}>Edit Order</Link>
                  </div>
                </div>
              ))}
              <div style={styles.cartSummary}>
                <p style={{ fontSize: '13px', fontWeight: 600 }}>Cart Summary ({cartItems.reduce((s,i)=>s+i.qty,0)} items)</p>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#cc0000', margin: '6px 0 12px' }}>
                  Total: ${cartTotal.toLocaleString()}.00
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to="/products" className="btn btn-outline">CONTINUE SHOPPING</Link>
                  <Link to="/checkout" className="btn btn-red">PROCEED TO CHECKOUT</Link>
                </div>
              </div>
            </>
          )}
        </div>
        <RelatedCarousel />
      </div>
    </div>
  );
}

const styles = {
  cartItem: { display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #eee', alignItems: 'flex-start' },
  cartImg: { width: 80, height: 60, flexShrink: 0, overflow: 'hidden' },
  cartInfo: { flex: 1 },
  cartQty: { width: 140, flexShrink: 0 },
  cartPrice: { width: 80, flexShrink: 0, fontWeight: 700, color: '#cc0000', fontSize: '14px', textAlign: 'right' },
  cartActions: { width: 120, flexShrink: 0, fontSize: '11px', textAlign: 'right' },
  cartSummary: { background: '#f9f9f9', border: '1px solid #ddd', padding: 16, marginTop: 16, textAlign: 'right' },
};

export default Cart;
