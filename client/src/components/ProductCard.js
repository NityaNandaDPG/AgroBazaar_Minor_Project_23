import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart}) => {
  const handleAddToCart = () => {
    addToCart(product._id,product.name,product.price);
  };

  return (
<div className="border p-2 m-4 w-64 h-96 rounded-lg shadow-lg">
  <img src={product.image} alt={product.name} className="object-cover w-full h-48" />
  <div className="text-center mt-4">
    <h2 className="text-lg font-semibold overflow-hidden whitespace-nowrap">{product.name}</h2>
    <p className="text-gray-600 overflow-hidden whitespace-nowrap">{product.description}</p>
  </div>
  <div className="flex items-center justify-between mt-4">
    <div className="text-2xl font-bold text-black">₹{product.price}</div>
    <button
      onClick={handleAddToCart}
      className="px-3 py-2 text-white rounded focus:outline-none bg-green-600"
    >
      Add to Cart
    </button>
  </div>
</div>
  );
};

export default ProductCard;