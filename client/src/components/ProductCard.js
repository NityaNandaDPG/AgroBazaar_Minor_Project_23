import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-box">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="product-price">₹{product.price}</div>
      <button>Add to Bag</button>
    </div>
  );
};

export default ProductCard;
