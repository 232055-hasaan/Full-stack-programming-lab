import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import RelatedCarousel from '../components/RelatedCarousel';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    alert('Login successful! Welcome back.');
    navigate('/my-account');
  };

  const F = ({ id, label, type = 'text', req }) => (
    <div className="form-group">
      <label>{label} {req && <span className="req">*</span>}</label>
      <div style={{ flex: 1, maxWidth: 220 }}>
        <input type={type} value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })}
          style={errors[id] ? { border: '1px solid #cc0000' } : {}} />
        {errors[id] && <div style={{ color: '#cc0000', fontSize: '11px', marginTop: 2 }}>{errors[id]}</div>}
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Login' }]} />
        <h1 className="page-title">Login Or Create Account</h1>
        <div className="content-box">
          <div style={styles.layout}>
            <div style={styles.left}>
              <div className="section-title">User Login Details</div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>Please sign in with your login information.</p>
              <p className="required-note"><span>*</span> Required Fields</p>
              <F id="email" label="Email" type="email" req />
              <F id="password" label="Password" type="password" req />
              <div className="checkbox-group">
                <input type="checkbox" id="remember" checked={form.remember} onChange={e => setForm({ ...form, remember: e.target.checked })} />
                <label htmlFor="remember">Remember me next time I visit</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <button className="btn btn-red" onClick={handleSubmit}>SIGN IN</button>
                <Link to="/forgot-password" style={{ fontSize: '12px', color: '#337ab7' }}>Forgot your password?</Link>
              </div>
            </div>
            <div style={styles.divider} />
            <div style={styles.right}>
              <div className="section-title">New Customer</div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>As a registered customer you can:</p>
              <ul style={{ fontSize: '12px', color: '#555', marginLeft: 20, marginBottom: 15, lineHeight: 2 }}>
                <li>Save billing & shipping information</li>
                <li>Check your order status</li>
                <li>Track your delivery status</li>
                <li>View your order history</li>
              </ul>
              <Link to="/register" className="btn btn-red">CREATE NEW ACCOUNT</Link>
            </div>
          </div>
        </div>
        <RelatedCarousel />
      </div>
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 24 },
  left: {},
  divider: { background: '#ddd', width: 1 },
  right: {},
};

export default Login;
