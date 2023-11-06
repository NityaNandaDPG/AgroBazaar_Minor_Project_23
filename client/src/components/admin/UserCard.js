import React from 'react';
import { Link } from 'react-router-dom';
import '../ProductCard.css';

const UserCard = ({user}) => {
  return (
    <div className="product-box">
      <img src={user.avatar} alt={user.firstname} />
      <h2>{user.username}</h2>
      <p>{user.type}</p>
      {/* <div className="product-price">₹{product.price}</div> */}
        {/* <Link to='/basket' className='btn btn-outline-warning float-right'>Add to Bag</Link> */}
    </div>
  );
};

export default UserCard;
