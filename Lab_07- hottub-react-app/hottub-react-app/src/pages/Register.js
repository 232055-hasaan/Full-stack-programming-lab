import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', password2: '', firstName: '', lastName: '', newsletter: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be 6-20 characters';
    if (form.password !== form.password2) e.password2 = 'Passwords do not match';
    if (!form.firstName) e.firstName = 'First name is required';
    if (!form.lastName) e.lastName = 'Last name is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    alert('Account created successfully! Please log in.');
    navigate('/login');
  };

  const F = ({ id, label, type = 'text', req }) => (
    <div className="form-group">
      <label>{label} {req && <span className="req">*</span>}</label>
      <div style={{ flex: 1, maxWidth: 260 }}>
        <input type={type} value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })}
          style={errors[id] ? { border: '1px solid #cc0000' } : {}} />
        {errors[id] && <div style={{ color: '#cc0000', fontSize: '11px', marginTop: 2 }}>{errors[id]}</div>}
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Register' }]} />
        <h1 className="page-title">Create New Account</h1>
        <div className="content-box">
          <div className="section-title">User Account Details</div>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: 8 }}>To create a new account, please fill in the required information. Passwords must be 6 to 20 characters long.</p>
          <p className="required-note"><span>*</span> Required Fields</p>
          <F id="email" label="Email Address" type="email" req />
          <F id="password" label="Password" type="password" req />
          <F id="password2" label="Re-enter Password" type="password" req />
          <F id="firstName" label="First Name" req />
          <F id="lastName" label="Last Name" req />
          <div className="checkbox-group" style={{ marginLeft: 165 }}>
            <input type="checkbox" id="newsletter" checked={form.newsletter} onChange={e => setForm({ ...form, newsletter: e.target.checked })} />
            <label htmlFor="newsletter">Yes, I want to receive email about new products and specials!</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginLeft: 165 }}>
            <button className="btn btn-red" onClick={handleSubmit}>CREATE ACCOUNT</button>
            <Link to="/login" style={{ fontSize: '12px', color: '#337ab7' }}>Already have an account? Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
