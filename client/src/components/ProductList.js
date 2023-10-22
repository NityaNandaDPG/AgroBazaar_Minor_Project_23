import React, { useState, useEffect } from 'react';
import '../App.css';
import './ProductList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
  const [vegs, setVegs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/vegs')
      .then((res) => {
        setVegs(res.data);
      })
      .catch((err) => {
        console.log('Error from Server');
      });
  }, []); 

  const productList =
    vegs.length === 0
      ? 'there is no product record!'
      : vegs.map((item, k) => <ProductCard product={item} key={k} />);

    return (
    <div>
        <div className='col-md-11'>
          <Link to='/form' className='btn btn-outline-warning float-right'>+ Post a Product</Link>
          <br />
          <br />
          <hr />
        </div>
        <div className='grid-container'>
          {productList}
        </div>
    </div>
    )
}

export default ProductList;