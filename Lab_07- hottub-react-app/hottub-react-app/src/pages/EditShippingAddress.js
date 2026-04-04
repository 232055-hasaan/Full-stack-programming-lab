import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Pakistan', 'Other'];
const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Florida','Georgia','Hawaii','Illinois','New York','Texas','Washington'];

function EditShippingAddress() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: 'John', lastName: 'Doe', company: '', address1: '123 Main St', address2: '', city: 'New York', state: 'New York', zip: '10001', country: 'United States', phone: '888-201-8899' });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => navigate('/my-account'), 1500); };
  const F = ({ id, label, req, type = 'text' }) => (
    <div className="form-group">
      <label>{label} {req && <span className="req">*</span>}</label>
      <input type={type} value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })} style={{ flex: 1, maxWidth: 280 }} />
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'My Account', path: '/my-account' }, { label: 'Edit Shipping Address' }]} />
        <h1 className="page-title">Edit Shipping Address</h1>
        <div className="content-box">
          {saved && <div className="alert alert-success">✓ Billing address saved successfully!</div>}
          <div className="section-title">Shipping Address</div>
          <p className="required-note"><span>*</span> Required Fields</p>
          <F id="firstName" label="First Name" req /><F id="lastName" label="Last Name" req />
          <F id="company" label="Company" /><F id="address1" label="Street Address" req /><F id="address2" label="Apt / Suite" />
          <F id="city" label="City" req /><F id="zip" label="ZIP / Postal Code" req /><F id="phone" label="Phone Number" req />
          <div className="form-group">
            <label>State <span className="req">*</span></label>
            <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} style={{ flex: 1, maxWidth: 280 }}>
              {states.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Country <span className="req">*</span></label>
            <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} style={{ flex: 1, maxWidth: 280 }}>
              {countries.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn btn-red" onClick={handleSave}>SAVE ADDRESS</button>
            <Link to="/my-account" className="btn btn-outline">CANCEL</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditShippingAddress;
