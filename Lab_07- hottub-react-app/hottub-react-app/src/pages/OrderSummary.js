import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';

function OrderSummary() {
  const { cartItems, cartTotal } = useCart();
  const orderId = '#HS-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Order Summary' }]} />
        <h1 className="page-title">Order Summary</h1>
        <div className="content-box">
          <div className="alert alert-success">
            ✓ Thank you! Your order <strong>{orderId}</strong> has been placed successfully.
            A confirmation email has been sent to your registered email address.
          </div>
          <div className="section-title">Order Details</div>
          <table style={{ marginBottom: 20 }}>
            <thead><tr><th>Product</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr></thead>
            <tbody>
              {cartItems.length > 0 ? cartItems.map(i => (
                <tr key={i.id}>
                  <td><Link to={`/product/${i.id}`}>{i.name}</Link></td>
                  <td>{i.qty}</td>
                  <td>${i.price.toLocaleString()}.00</td>
                  <td>${(i.price * i.qty).toLocaleString()}.00</td>
                </tr>
              )) : (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>Emerald Bay XL Hot Tub (Sample Order)</td></tr>
              )}
              <tr>
                <td colSpan={3} style={{ textAlign: 'right', fontWeight: 700 }}>Shipping:</td>
                <td style={{ color: '#4a9a4a', fontWeight: 600 }}>FREE</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: 'right', fontWeight: 700 }}>Grand Total:</td>
                <td style={{ fontWeight: 700, fontSize: '15px', color: '#cc0000' }}>${(cartTotal || 1979).toLocaleString()}.00</td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/order-details" className="btn btn-gray">VIEW ORDER DETAILS</Link>
            <Link to="/products" className="btn btn-red">CONTINUE SHOPPING</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderSummary;
