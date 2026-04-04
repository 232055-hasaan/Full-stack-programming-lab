import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address'); return; }
    setSent(true); setError('');
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Forgot Password' }]} />
        <h1 className="page-title">Forgot Your Password?</h1>
        <div className="content-box" style={{ maxWidth: 480 }}>
          {sent ? (
            <div className="alert alert-success">
              ✓ A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
              <br /><br /><Link to="/login" className="btn btn-red">BACK TO LOGIN</Link>
            </div>
          ) : (
            <>
              <div className="section-title">Reset Password</div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: 16 }}>Enter your registered email address and we will send you a link to reset your password.</p>
              <div className="form-group">
                <label>Email Address <span className="req">*</span></label>
                <div style={{ flex: 1, maxWidth: 260 }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    style={error ? { border: '1px solid #cc0000' } : {}} />
                  {error && <div style={{ color: '#cc0000', fontSize: '11px', marginTop: 2 }}>{error}</div>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginLeft: 165 }}>
                <button className="btn btn-red" onClick={handleSubmit}>SEND RESET LINK</button>
                <Link to="/login" className="btn btn-outline">CANCEL</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
