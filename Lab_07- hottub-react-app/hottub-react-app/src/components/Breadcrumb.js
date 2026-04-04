import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb({ crumbs }) {
  // crumbs: [{label, path}]
  return (
    <div className="breadcrumb">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>›</span>}
          {c.path ? <Link to={c.path}>{c.label}</Link> : <span style={{ color: '#333' }}>{c.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;
