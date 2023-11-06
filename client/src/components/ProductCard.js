import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart}) => {
  const handleAddToCart = () => {
    addToCart(product._id);
  };

  return (
    <div className="product-box">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="product-price">₹{product.price}</div>
      <button
          onClick={handleAddToCart}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Add to Cart
        </button>
    </div>
  );
};

export default ProductCard;