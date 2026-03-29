const products = [
  { id: 1, title: 'Laptop', description: 'High performance laptop' },
  { id: 2, title: 'Phone', description: 'Latest smartphone' },
  { id: 3, title: 'Tablet', description: 'Portable tablet device' },
];

function Products() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Products</h1>
      {products.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc', margin: '10px auto', padding: '15px', width: '300px', borderRadius: '8px' }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <button onClick={() => alert(`${p.title} added to cart!`)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
export default Products;