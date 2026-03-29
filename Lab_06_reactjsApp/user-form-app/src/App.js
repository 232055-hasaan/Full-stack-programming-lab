import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(null);

  const handleSubmit = () => {
    setSubmitted({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>User Form App</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '250px' }}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '250px' }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '8px 20px' }}>
        Submit
      </button>

      {submitted && (
        <div style={{ marginTop: '30px' }}>
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;