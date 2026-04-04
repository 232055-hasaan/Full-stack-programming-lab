import React from 'react';

function BrandsBar() {
  return (
    <div className="brands-bar">
      <div className="container">
        <div className="brand-item">
          <div className="brand-save">
            <span className="big">SAVE $1,000'S</span><br />
            ON THE TOP SPA BRANDS<br />
            <b>HUGE DISCOUNTS</b> SHOP EARLY FOR<br />
            THE BEST SELECTION!
          </div>
        </div>
        <div className="brand-item">
          <span className="brand-name brand-oceanic">Oceanic<em>Spa</em></span>
        </div>
        <div className="brand-item">
          <span className="brand-name brand-caldera">Caldera<span style={{ color: '#888' }}>Spas</span></span>
        </div>
        <div className="brand-item">
          <span className="brand-name brand-island">
            Island<span style={{ color: '#888' }}>Spas</span>
            <br /><small style={{ color: '#999', fontSize: '9px' }}>by ARTESIAN</small>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BrandsBar;
