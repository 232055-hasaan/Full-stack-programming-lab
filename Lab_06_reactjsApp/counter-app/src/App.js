import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => { if (count > 0) setCount(count - 1); };
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Counter Application</h1>
      <h2 style={{ fontSize: '60px' }}>{count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement} style={{ margin: '0 10px' }}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;