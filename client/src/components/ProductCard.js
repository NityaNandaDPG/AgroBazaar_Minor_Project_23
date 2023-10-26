import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-box">
      {/* <img src={product.image} alt={product.name} /> */}
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="product-price">₹{product.price}</div>
        <Link to='/basket' className='btn btn-outline-warning float-right'>Add to Bag</Link>
    </div>
  );
};

export default ProductCard;
