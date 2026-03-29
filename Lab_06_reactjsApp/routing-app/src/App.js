import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Products from './Products';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <nav style={{ textAlign: 'center', padding: '15px', backgroundColor: '#333' }}>
        <Link to="/" style={{ color: 'white', margin: '0 15px' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', margin: '0 15px' }}>About</Link>
        <Link to="/contact" style={{ color: 'white', margin: '0 15px' }}>Contact Us</Link>
        <Link to="/products" style={{ color: 'white', margin: '0 15px' }}>Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;