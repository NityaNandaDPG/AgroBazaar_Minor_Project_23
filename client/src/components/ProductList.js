import React, {useState, useEffect} from 'react';
import { useSelector} from "react-redux";
import '../App.css';
import './ProductList.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
  
  const id = useSelector((state) => state.user._id);
  const [vegs, setVegs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/products/all')
      .then((res) => {
        setVegs(res.data);
      })
      .catch((err) => {
        console.log('Error from Server');
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.put(`http://localhost:8082/add2cart/${id}`, {
        productId,
      },
      {
        headers: {
            'Content-Type': 'application/json',
        },
    }
      );
    }
    catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  const productList =
    vegs.length === 0
      ? 'There is no product record!'
      : vegs.map((item, k) => <ProductCard key={k} product={item}   addToCart={()=>addToCart(item._id)}/>);

    return (
    <div>
        <div className='col-md-11'>
          <Link to='/form' className='btn btn-outline-warning float-right'>+ Post a Product</Link>
          <br/>
          <br/>
          <hr/>
        </div>
        <div className='grid-container'>
          {productList}
        </div>
    </div>
    )
}
export default ProductList;