import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>CONTACT US</h4>
            <p>
              hottubspaservice.com<br />
              CALL 24/7: 888-201-8899<br />
              Your Address:<br />
              Street, State &amp; Zip Code<br />
              City &amp; Country<br />
              Email: service@hottubspaservice.com
            </p>
            <div className="footer-social">
              <a href="#!" className="s-tw">t</a>
              <a href="#!" className="s-fb">f</a>
              <a href="#!" className="s-li">in</a>
              <a href="#!" className="s-gp">g+</a>
              <a href="#!" className="s-yt">▶</a>
              <a href="#!" className="s-pi">P</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>INFORMATION</h4>
            <ul>
              <li><Link to="/about">ABOUT US</Link></li>
              <li><Link to="/contact">CUSTOMER SERVICE</Link></li>
              <li><Link to="/terms">PRIVACY POLICY</Link></li>
              <li><a href="#!">SITE MAP</a></li>
              <li><a href="#!">SEARCH TERMS</a></li>
              <li><Link to="/contact">CONTACT US</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>MY ACCOUNT</h4>
            <ul>
              <li><Link to="/login">SIGN IN</Link></li>
              <li><Link to="/cart">VIEW CART</Link></li>
              <li><a href="#!">MY WISHLIST</a></li>
              <li><Link to="/my-account">MY ACCOUNT</Link></li>
              <li><Link to="/order-history">ORDER HISTORY</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SIGNUP FOR A NEWSLETTER</h4>
            <p>SIGN UP FOR OUR NEWSLETTER:</p>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-red"
              style={{ fontSize: '11px', padding: '5px 12px', marginTop: '4px' }}
              onClick={() => { alert('Thank you for subscribing!'); setEmail(''); }}
            >
              SUBSCRIBE
            </button>
            <p style={{ marginTop: '10px', fontSize: '11px', color: '#aaa' }}>PAYMENT SOLUTIONS</p>
            <div className="payment-icons">
              <span className="pay-icon pay-mc">MC</span>
              <span className="pay-icon pay-am">AMEX</span>
              <span className="pay-icon pay-vs">VISA</span>
              <span className="pay-icon pay-pp">PayPal</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2024 Hottubspaservice.com. All Rights Reserved.</div>
    </footer>
  );
}

export default Footer;
