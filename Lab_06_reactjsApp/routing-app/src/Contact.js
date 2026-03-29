import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    alert(`Message sent by ${form.name}`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Contact Us</h1>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '250px' }} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '250px' }} />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '250px', height: '100px' }} />
      <button onClick={handleSubmit} style={{ padding: '8px 20px', marginTop: '10px' }}>Send</button>
    </div>
  );
}
export default Contact;