import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

function EditAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '888-201-8899', currentPass: '', newPass: '', confirmPass: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => navigate('/my-account'), 1500); };
  const F = ({ id, label, type = 'text', req }) => (
    <div className="form-group">
      <label>{label} {req && <span className="req">*</span>}</label>
      <input type={type} value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })} style={{ flex: 1, maxWidth: 280 }} />
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'My Account', path: '/my-account' }, { label: 'Edit Account' }]} />
        <h1 className="page-title">Edit Account Information</h1>
        <div className="content-box">
          {saved && <div className="alert alert-success">✓ Account information saved successfully!</div>}
          <div className="section-title">Personal Information</div>
          <F id="firstName" label="First Name" req /><F id="lastName" label="Last Name" req />
          <F id="email" label="Email Address" type="email" req /><F id="phone" label="Phone Number" />
          <div className="section-title" style={{ marginTop: 20 }}>Change Password <span style={{ fontSize: '11px', fontWeight: 400, color: '#888' }}>(leave blank to keep current)</span></div>
          <F id="currentPass" label="Current Password" type="password" /><F id="newPass" label="New Password" type="password" /><F id="confirmPass" label="Confirm Password" type="password" />
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn btn-red" onClick={handleSave}>SAVE CHANGES</button>
            <Link to="/my-account" className="btn btn-outline">CANCEL</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAccount;
