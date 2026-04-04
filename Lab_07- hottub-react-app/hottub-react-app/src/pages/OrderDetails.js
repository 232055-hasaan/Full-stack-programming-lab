import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const sampleOrders = [
  { id: '#HS-482910', date: 'March 28, 2024', status: 'Shipped', items: 2, total: '$3,958.00', tracking: 'UPS-9834720193' },
  { id: '#HS-381027', date: 'February 14, 2024', status: 'Delivered', items: 1, total: '$4,899.00', tracking: 'FEDEX-4829103' },
  { id: '#HS-290183', date: 'January 5, 2024', status: 'Delivered', items: 3, total: '$2,397.00', tracking: 'UPS-7261839017' },
];

function OrderDetails() {
  const statusColor = { Shipped: '#337ab7', Delivered: '#4a9a4a', Processing: '#f0a500', Cancelled: '#cc0000' };

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'My Account', path: '/my-account' }, { label: 'Order History' }]} />
        <h1 className="page-title">Order History</h1>
        <div className="content-box">
          <div className="section-title">My Orders</div>
          {sampleOrders.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '30px 0' }}>You have no orders yet. <Link to="/products">Start shopping →</Link></p>
          ) : (
            <table>
              <thead><tr><th>Order ID</th><th>Date</th><th>Status</th><th>Items</th><th>Total</th><th>Tracking</th><th>Action</th></tr></thead>
              <tbody>
                {sampleOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 600, color: '#337ab7' }}>{o.id}</td>
                    <td>{o.date}</td>
                    <td><span style={{ color: statusColor[o.status] || '#555', fontWeight: 600 }}>{o.status}</span></td>
                    <td>{o.items}</td>
                    <td style={{ fontWeight: 600 }}>{o.total}</td>
                    <td style={{ fontSize: '10px', color: '#888' }}>{o.tracking}</td>
                    <td><a href="#!" style={{ fontSize: '11px', color: '#cc0000' }}>View</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ marginTop: 20 }}>
            <Link to="/my-account" className="btn btn-outline">BACK TO MY ACCOUNT</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
