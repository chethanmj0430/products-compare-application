import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, isSelected, onToggleCompare }) => {
  return (
    <div className={`product-card ${isSelected ? 'selected' : ''}`}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> {product.price}</p>
      <ul>
        {product.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <button onClick={() => onToggleCompare(product.id)}>
        {isSelected ? 'Remove from Compare' : 'Add to Compare'}
      </button>
    </div>
  );
};

export default ProductCard;
