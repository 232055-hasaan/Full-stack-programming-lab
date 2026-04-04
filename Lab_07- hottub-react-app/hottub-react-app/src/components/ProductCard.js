import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`"${product.shortName}" added to cart!`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.img} alt={product.name} />
      </Link>
      <h4>{product.shortName}</h4>
      <p>{product.desc}</p>
      <div className="product-price">${product.price.toLocaleString()}.00</div>
      <button className="btn-cart" onClick={handleAddToCart}>
        🛒 ADD TO CART
      </button>
      <div className="product-actions">
        <a href="#!">ADD TO WISH LIST</a>
        <Link to={`/product/${product.id}`}>MORE DETAILS</Link>
      </div>
    </div>
  );
}

export default ProductCard;
