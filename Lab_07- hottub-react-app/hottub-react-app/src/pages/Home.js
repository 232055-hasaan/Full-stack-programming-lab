import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import RelatedCarousel from '../components/RelatedCarousel';

const slides = [
  { title: 'Barrier Reef 158 Jet\nTV- Stereo - Home Theater\nSuper Spa', desc: 'Extra Large and Deep. 8 Person\n158 Jet Super Spa, TV-Home Theater Spa System', price: '$4899.00', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=320&h=220&fit=crop' },
  { title: 'Premium Spa Collection\nLuxury Home Retreat', desc: '5-7 Person Capacity\nAdvanced Hydrotherapy System', price: '$3999.00', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=320&h=220&fit=crop' },
  { title: 'Island Spa Series\nProfessional Grade', desc: 'Ultimate relaxation experience\nBuilt for durability and performance', price: '$5499.00', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=320&h=220&fit=crop' },
];

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-wrapper home-wrapper">
      <div className="container">
        {/* Hero Slider */}
        <div style={styles.slider}>
          {slides.map((slide, i) => (
            <div key={i} style={{ ...styles.slide, display: i === activeSlide ? 'flex' : 'none' }}>
              <div style={styles.slideText}>
                <h2 style={styles.slideTitle}>{slide.title.split('\n').map((l,j)=><span key={j}>{l}<br/></span>)}</h2>
                <p style={styles.slideDesc}>{slide.desc.split('\n').map((l,j)=><span key={j}>{l}<br/></span>)}</p>
                <div style={styles.slidePrice}>{slide.price}</div>
                <Link to="/product/1" className="btn btn-red">More Details</Link>
              </div>
              <div style={styles.slideImg}>
                <img src={slide.img} alt="Hot Tub Spa" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
            </div>
          ))}
          <div style={styles.dots}>
            {slides.map((_, i) => (
              <span key={i} onClick={() => setActiveSlide(i)}
                style={{ ...styles.dot, background: i === activeSlide ? '#cc0000' : '#ccc' }} />
            ))}
          </div>
        </div>

        {/* Promo Banners */}
        <div style={styles.promoRow}>
          <div style={{ ...styles.promoCard, background: '#2c5f8a' }}>
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=160&h=100&fit=crop" alt="5-7 Person Spa" style={styles.promoImg} />
            <div style={styles.promoInfo}>
              <strong style={{ color: '#fff', fontSize: '13px' }}>5-7 PERSON SPA</strong>
              <p style={{ color: '#ccc', fontSize: '11px', marginTop: 4 }}>PROIN GRAVIDA NIBH VEL VELIT AUCTOR ALIQUET. LOREM IPSUM.</p>
            </div>
          </div>
          <div style={{ ...styles.promoCard, background: '#1a2332' }}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&h=100&fit=crop" alt="TV Theater Spa" style={styles.promoImg} />
            <div style={styles.promoInfo}>
              <strong style={{ color: '#fff', fontSize: '13px' }}>TV THEATER SPA</strong>
              <p style={{ color: '#ccc', fontSize: '11px', marginTop: 4 }}>LOREM IPSUM PROIN GRAVIDA NIBH.</p>
            </div>
          </div>
          <div style={{ ...styles.promoCard, background: '#cc0000', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>SAVE</div>
              <div style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1 }}>50%</div>
            </div>
            <p style={{ color: '#ffc', fontSize: '10px', textAlign: 'center', marginTop: 6 }}>LOREM IPSUM PROIN GRAVIDA NIBH VEL VELIT AUCTOR</p>
          </div>
        </div>

        {/* New Products */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 12px', borderBottom: '2px solid #cc0000', paddingBottom: 6 }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '18px', color: '#222', letterSpacing: 1 }}>NEW PRODUCTS</h2>
          <Link to="/products" style={{ marginLeft: 'auto', fontSize: '11px', color: '#337ab7' }}>View All →</Link>
        </div>
        <div className="product-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <RelatedCarousel />
      </div>
    </div>
  );
}

const styles = {
  slider: { position: 'relative', background: '#1a2332', marginBottom: 15, minHeight: 200, overflow: 'hidden' },
  slide: { display: 'flex', alignItems: 'center', padding: '20px 20px 40px', gap: 20 },
  slideText: { flex: 1, color: '#fff' },
  slideTitle: { fontFamily: 'Oswald, sans-serif', fontSize: '20px', fontWeight: 700, marginBottom: 10, lineHeight: 1.3 },
  slideDesc: { fontSize: '12px', color: '#ccc', marginBottom: 10, lineHeight: 1.6 },
  slidePrice: { fontSize: '22px', fontWeight: 700, color: '#ff9900', marginBottom: 12 },
  slideImg: { width: 260, height: 180, flexShrink: 0, overflow: 'hidden' },
  dots: { position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: '50%', cursor: 'pointer', transition: 'background 0.3s' },
  promoRow: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 },
  promoCard: { display: 'flex', alignItems: 'center', gap: 12, padding: 12, minHeight: 90 },
  promoImg: { width: 100, height: 70, objectFit: 'cover', flexShrink: 0 },
  promoInfo: { flex: 1 },
};

export default Home;
