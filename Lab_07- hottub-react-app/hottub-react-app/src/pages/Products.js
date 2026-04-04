import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import RelatedCarousel from '../components/RelatedCarousel';

const categories = ['All', '2-4 People', '5-7 People', '8+ People'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $3,000', min: 0, max: 3000 },
  { label: '$3,000 to $4,000', min: 3000, max: 4000 },
  { label: '$4,000 to $5,000', min: 4000, max: 5000 },
  { label: '$5,000+', min: 5000, max: Infinity },
];

function Products() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePriceIdx, setActivePriceIdx] = useState(0);
  const [perPage, setPerPage] = useState(9);

  const priceRange = priceRanges[activePriceIdx];
  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchPrice = p.price >= priceRange.min && p.price < priceRange.max;
    const matchSearch = searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchSearch;
  });

  return (
    <div className="page-wrapper">
      <div className="container">
        <Breadcrumb crumbs={[{ label: 'Home', path: '/' }, { label: 'Products' }]} />
        <div style={{ display: 'flex', gap: 15 }}>
          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Shopping Options</h3>
            <div style={styles.filterGroup}>
              <h4 style={styles.filterHead}>SEATING CAPACITY</h4>
              <ul style={styles.filterList}>
                {categories.map(cat => (
                  <li key={cat}>
                    <a href="#!" style={{ ...styles.filterLink, color: activeCategory === cat ? '#cc0000' : '#555', fontWeight: activeCategory === cat ? 700 : 400 }}
                      onClick={e => { e.preventDefault(); setActiveCategory(cat); }}>
                      {cat === 'All' ? 'ALL PRODUCTS' : cat.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.filterGroup}>
              <h4 style={styles.filterHead}>PRICE RANGE</h4>
              <ul style={styles.filterList}>
                {priceRanges.map((r, i) => (
                  <li key={i}>
                    <a href="#!" style={{ ...styles.filterLink, color: activePriceIdx === i ? '#cc0000' : '#555', fontWeight: activePriceIdx === i ? 700 : 400 }}
                      onClick={e => { e.preventDefault(); setActivePriceIdx(i); }}>
                      {r.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.filterGroup}>
              <h4 style={styles.filterHead}>SPAS BY TYPE</h4>
              <ul style={styles.filterList}>
                {['PLUG AND PLAY 110V', 'TV - STEREO SPAS', 'CORNER SPAS', 'PORTABLE SPAS', 'DEEPER SPAS'].map(t => (
                  <li key={t}><a href="#!" style={styles.filterLink}>{t}</a></li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main */}
          <main style={{ flex: 1 }}>
            <div style={styles.catHeader}>
              <h2 style={{ fontFamily: 'Oswald,sans-serif', fontSize: '18px' }}>
                {searchQuery ? `Search Results: "${searchQuery}"` : 'Top Product Listing'}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '12px' }}>
                <span>{filtered.length} Item(s)</span>
                <label>Show&nbsp;
                  <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} style={{ padding: '2px 4px', fontSize: '12px' }}>
                    <option value={9}>9</option><option value={18}>18</option><option value={36}>36</option>
                  </select>
                </label>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="content-box" style={{ textAlign: 'center', paddingTop: 40 }}>
                <p style={{ fontSize: '16px', color: '#666' }}>No products found.</p>
                <a href="#!" onClick={e => { e.preventDefault(); setActiveCategory('All'); setActivePriceIdx(0); }} style={{ color: '#cc0000' }}>Clear filters</a>
              </div>
            ) : (
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                {filtered.slice(0, perPage).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
            <RelatedCarousel />
          </main>
        </div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: { width: 170, flexShrink: 0, background: 'rgba(245,245,245,0.9)', border: '1px solid #ddd', padding: 12, alignSelf: 'flex-start' },
  sidebarTitle: { fontFamily: 'Oswald,sans-serif', fontSize: '14px', fontWeight: 700, color: '#222', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid #cc0000' },
  filterGroup: { marginBottom: 14 },
  filterHead: { fontSize: '11px', fontWeight: 700, color: '#333', marginBottom: 6, textTransform: 'uppercase' },
  filterList: { listStyle: 'none' },
  filterLink: { fontSize: '11px', color: '#555', display: 'block', padding: '2px 0', textDecoration: 'none' },
  catHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #ddd' },
};

export default Products;
