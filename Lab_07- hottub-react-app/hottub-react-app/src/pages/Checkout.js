import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';

function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'United States', phone: '' });
  const [payment, setPayment] = useState({ cardName: '', cardNum: '', expiry: '', cvv: '', method: 'credit' });
  const [errors, setErrors] = useState({});

  const validateShipping = () => {
    const e = {};
    ['firstName','lastName','address','city','state','zip','phone'].forEach(f => { if (!shipping[f]) e[f] = 'Required'; });
    return e;
  };

  const handlePlaceOrder = () => {
    navigate('/order-summary');
  };

  const SF = ({ id, label, req, obj, setObj }) => (
    <div className="form-group">
      <label>{label} {req && <span className="req">*</span>}</label>
      <div style={{ flex: 1, maxWidth: 280 }}>
        <input value={obj[id]} onChange={e => setObj({ ...obj, [id]: e.target.value })}
          style={errors[id] ? { border: '1px solid #cc0000' } : {}} />
        {errors[id] && <div style={{ color: '#cc0000', fontSize: '11px', marginTop: 2 }}>{errors[id]}</div>}
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />
        <h1 className="page-title">Secure Checkout</h1>

        {/* Steps */}
        <div style={styles.steps}>
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} style={{ ...styles.step, background: step >= i + 1 ? '#cc0000' : '#ddd', color: step >= i + 1 ? '#fff' : '#888' }}>
              {i + 1}. {s}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 16 }}>
          <div className="content-box">
            {step === 1 && (
              <>
                <div className="section-title">Shipping Address</div>
                <SF id="firstName" label="First Name" req obj={shipping} setObj={setShipping} />
                <SF id="lastName" label="Last Name" req obj={shipping} setObj={setShipping} />
                <SF id="address" label="Street Address" req obj={shipping} setObj={setShipping} />
                <SF id="city" label="City" req obj={shipping} setObj={setShipping} />
                <SF id="state" label="State" req obj={shipping} setObj={setShipping} />
                <SF id="zip" label="ZIP Code" req obj={shipping} setObj={setShipping} />
                <SF id="phone" label="Phone" req obj={shipping} setObj={setShipping} />
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button className="btn btn-red" onClick={() => { const e = validateShipping(); if (Object.keys(e).length) { setErrors(e); return; } setStep(2); }}>CONTINUE TO PAYMENT</button>
                  <Link to="/cart" className="btn btn-outline">BACK TO CART</Link>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="section-title">Payment Method</div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  {['credit', 'paypal'].map(m => (
                    <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', cursor: 'pointer' }}>
                      <input type="radio" name="payMethod" value={m} checked={payment.method === m} onChange={e => setPayment({ ...payment, method: e.target.value })} />
                      {m === 'credit' ? '💳 Credit / Debit Card' : '🅿️ PayPal'}
                    </label>
                  ))}
                </div>
                {payment.method === 'credit' && (
                  <>
                    <SF id="cardName" label="Name on Card" req obj={payment} setObj={setPayment} />
                    <SF id="cardNum" label="Card Number" req obj={payment} setObj={setPayment} />
                    <SF id="expiry" label="Expiry (MM/YY)" req obj={payment} setObj={setPayment} />
                    <SF id="cvv" label="CVV" req obj={payment} setObj={setPayment} />
                  </>
                )}
                {payment.method === 'paypal' && <div className="alert alert-info">You will be redirected to PayPal to complete your purchase.</div>}
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button className="btn btn-red" onClick={() => setStep(3)}>REVIEW ORDER</button>
                  <button className="btn btn-outline" onClick={() => setStep(1)}>BACK</button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="section-title">Review Your Order</div>
                <table>
                  <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
                  <tbody>
                    {cartItems.map(i => <tr key={i.id}><td>{i.name}</td><td>{i.qty}</td><td>${(i.price * i.qty).toLocaleString()}.00</td></tr>)}
                    <tr><td colSpan={2} style={{ textAlign: 'right', fontWeight: 700 }}>Total:</td><td style={{ fontWeight: 700, color: '#cc0000' }}>${cartTotal.toLocaleString()}.00</td></tr>
                  </tbody>
                </table>
                <div className="alert alert-info" style={{ marginTop: 16 }}>
                  <strong>Shipping to:</strong> {shipping.firstName} {shipping.lastName}, {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button className="btn btn-red" onClick={handlePlaceOrder}>PLACE ORDER</button>
                  <button className="btn btn-outline" onClick={() => setStep(2)}>BACK</button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div style={styles.orderBox}>
            <div className="section-title">Order Summary</div>
            {cartItems.map(i => <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: 4 }}><span>{i.shortName || i.name} x{i.qty}</span><span>${(i.price * i.qty).toLocaleString()}</span></div>)}
            <div style={{ borderTop: '1px solid #ddd', marginTop: 10, paddingTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Subtotal:</span><span>${cartTotal.toLocaleString()}.00</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Shipping:</span><span style={{ color: '#4a9a4a' }}>FREE</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, marginTop: 8, color: '#cc0000' }}><span>Total:</span><span>${cartTotal.toLocaleString()}.00</span></div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: '10px', color: '#888', marginBottom: 4 }}>We accept:</div>
              <div className="payment-icons" style={{ justifyContent: 'center' }}>
                <span className="pay-icon pay-mc">MC</span><span className="pay-icon pay-vs">VISA</span><span className="pay-icon pay-am">AMEX</span><span className="pay-icon pay-pp">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  steps: { display: 'flex', gap: 4, marginBottom: 16 },
  step: { padding: '8px 16px', fontSize: '12px', fontWeight: 700, flex: 1, textAlign: 'center' },
  orderBox: { background: 'rgba(245,245,245,0.9)', border: '1px solid #ddd', padding: 14, alignSelf: 'flex-start' },
};

export default Checkout;
