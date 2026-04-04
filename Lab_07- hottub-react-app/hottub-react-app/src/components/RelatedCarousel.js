import React, { useRef } from 'react';
import { relatedProducts } from '../data/products';

function RelatedCarousel() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 160, behavior: 'smooth' });
    }
  };

  return (
    <div className="related-section">
      <h3>Customers Who Viewed This Item Also</h3>
      <div className="carousel-wrapper">
        <button className="carousel-btn carousel-prev" onClick={() => scroll(-1)}>‹</button>
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
        >
          {relatedProducts.map((item) => (
            <div key={item.id} className="carousel-item">
              <img src={item.img} alt={item.name} />
              <div className="price">{item.price}</div>
              <p>{item.name}<br /><small>{item.sku}</small></p>
            </div>
          ))}
        </div>
        <button className="carousel-btn carousel-next" onClick={() => scroll(1)}>›</button>
      </div>
    </div>
  );
}

export default RelatedCarousel;
