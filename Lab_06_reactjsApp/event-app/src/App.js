import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const showMessage = () => setMessage('Hello! This is a message!');
  const changeBackground = () => setBgColor('#' + Math.floor(Math.random() * 16777215).toString(16));
  const showAlert = () => alert('This is an Alert!');

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', backgroundColor: bgColor, minHeight: '100vh', padding: '50px' }}>
      <h1>Interactive Buttons App</h1>

      <button onClick={showMessage} style={{ margin: '10px', padding: '10px 20px' }}>
        Show Message
      </button>
      <button onClick={changeBackground} style={{ margin: '10px', padding: '10px 20px' }}>
        Change Background Color
      </button>
      <button onClick={showAlert} style={{ margin: '10px', padding: '10px 20px' }}>
        Show Alert
      </button>

      <p
        style={{ marginTop: '30px', fontSize: '20px', color: textColor }}
        onMouseOver={() => setTextColor('#ff0000')}
        onMouseOut={() => setTextColor('#000000')}
      >
        {message}
      </p>
    </div>
  );
}

export default App;