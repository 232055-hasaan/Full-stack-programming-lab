import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

function AboutUs() {
  const team = [
    { name: 'James Wilson', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face' },
    { name: 'Sarah Mitchell', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=120&h=120&fit=crop&crop=face' },
    { name: 'Robert Chen', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face' },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'About Us' }]} />
        <h1 className="page-title">About HotSpring Portable Spas</h1>
        <div className="content-box">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 20 }}>
            <div>
              <div className="section-title">Our Story</div>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.8, marginBottom: 14 }}>
                HotSpring Portable Spas has been providing premium hot tub and spa solutions since 1998. We are dedicated to bringing relaxation, wellness, and luxury directly to your backyard at unbeatable prices.
              </p>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.8, marginBottom: 14 }}>
                We partner with the world's top spa manufacturers — including Oceanic, Caldera, and Island Spas — to offer the widest selection of portable spas, from plug-and-play 110V models to fully-featured 8-person TV entertainment systems.
              </p>
              <div className="section-title" style={{ marginTop: 20 }}>Why Choose Us?</div>
              <ul style={{ fontSize: '13px', color: '#555', lineHeight: 2, marginLeft: 20 }}>
                <li>✓ Over 25 years of industry experience</li>
                <li>✓ Low Price Guarantee on all products</li>
                <li>✓ Free shipping on orders over $500</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Certified installation partners nationwide</li>
                <li>✓ Manufacturer warranties honored</li>
              </ul>
            </div>
            <div>
              <div className="section-title">Quick Facts</div>
              {[['Founded', '1998'], ['Products', '500+'], ['Customers', '50,000+'], ['Rating', '4.8 / 5 ★'], ['Support', '24/7']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '12px' }}>
                  <span style={{ color: '#666' }}>{k}</span><span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-title" style={{ marginTop: 24 }}>Meet Our Team</div>
          <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
            {team.map(m => (
              <div key={m.name} style={{ textAlign: 'center', flex: 1 }}>
                <img src={m.img} alt={m.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #cc0000' }} />
                <div style={{ fontWeight: 700, marginTop: 8, fontSize: '13px' }}>{m.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
