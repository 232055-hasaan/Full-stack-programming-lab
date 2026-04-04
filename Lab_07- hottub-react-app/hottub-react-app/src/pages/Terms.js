import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

function Terms() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing and using HotSpring Portable Spas website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
    { title: '2. Products & Pricing', content: 'All prices are listed in USD. We reserve the right to change prices at any time without notice. Product availability is not guaranteed and may vary.' },
    { title: '3. Order Processing', content: 'Orders are processed within 1-2 business days. You will receive a confirmation email with your order details and tracking information once your order has shipped.' },
    { title: '4. Shipping Policy', content: 'Free shipping is available on orders over $500 within the continental United States. Standard delivery takes 7-10 business days. Expedited shipping options are available at checkout.' },
    { title: '5. Returns & Refunds', content: 'We accept returns within 30 days of delivery for items in original condition. Customers are responsible for return shipping costs. Refunds are processed within 5-7 business days.' },
    { title: '6. Warranty', content: 'All products come with the manufacturer\'s warranty. HotSpring Portable Spas provides additional 1-year service warranty on all portable spa units sold through our store.' },
    { title: '7. Privacy Policy', content: 'We collect personal information to process orders and improve your shopping experience. We do not sell your personal information to third parties. Please review our full Privacy Policy for details.' },
    { title: '8. Limitation of Liability', content: 'HotSpring Portable Spas shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.' },
    { title: '9. Contact Information', content: 'For any questions regarding these Terms and Conditions, please contact us at service@hottubspaservice.com or call 888-201-8899.' },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Terms & Conditions' }]} />
        <h1 className="page-title">Terms & Conditions</h1>
        <div className="content-box">
          <p style={{ fontSize: '12px', color: '#888', marginBottom: 16 }}>Last updated: January 1, 2024</p>
          {sections.map((s) => (
            <div key={s.title} style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '15px', color: '#222', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.8 }}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Terms;
