import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  const F = ({ id, label, req, type = 'text', textarea }) => (
    <div className="form-group" style={textarea ? { alignItems: 'flex-start' } : {}}>
      <label style={textarea ? { paddingTop: 6 } : {}}>{label} {req && <span className="req">*</span>}</label>
      <div style={{ flex: 1, maxWidth: 400 }}>
        {textarea
          ? <textarea value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })} style={errors[id] ? { border: '1px solid #cc0000' } : {}} />
          : <input type={type} value={form[id]} onChange={e => setForm({ ...form, [id]: e.target.value })} style={errors[id] ? { border: '1px solid #cc0000' } : {}} />}
        {errors[id] && <div style={{ color: '#cc0000', fontSize: '11px', marginTop: 2 }}>{errors[id]}</div>}
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]} />
        <h1 className="page-title">Contact Us</h1>
        <div className="content-box">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 20 }}>
            <div>
              {sent ? (
                <div className="alert alert-success" style={{ fontSize: '14px' }}>
                  ✓ Thank you, <strong>{form.name}</strong>! Your message has been sent. We'll get back to you within 24 hours.
                </div>
              ) : (
                <>
                  <div className="section-title">Send Us a Message</div>
                  <p className="required-note"><span>*</span> Required Fields</p>
                  <F id="name" label="Full Name" req /><F id="email" label="Email" type="email" req /><F id="phone" label="Phone" />
                  <F id="subject" label="Subject" /><F id="message" label="Message" req textarea />
                  <div style={{ marginLeft: 165 }}>
                    <button className="btn btn-red" onClick={handleSubmit}>SEND MESSAGE</button>
                  </div>
                </>
              )}
            </div>
            <div>
              <div className="section-title">Contact Info</div>
              {[['📞 Phone', '888-201-8899'], ['📧 Email', 'service@hottubspaservice.com'], ['🕐 Hours', 'Mon-Sat: 9AM-6PM EST'], ['📍 Address', '123 Spa Blvd, New York, NY 10001']].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#333' }}>{k}</div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactUs;
