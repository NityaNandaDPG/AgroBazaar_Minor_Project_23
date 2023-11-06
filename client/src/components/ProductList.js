import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList() {
  const id = useSelector((state) => state.user._id);
  const [vegs, setVegs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8082/products/all');
        setVegs(response.data);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error('Error from Server:', error);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (productId, p_name, price) => {
    try {
      const response = await axios.put(`http://localhost:8082/add2cart/${id}`, {
        productId,
        p_name,
        price,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  //client
  const handleFilterSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:8082/products/all', {
        params: {
          name: searchTerm,
          category: categoryFilter,
          maxPrice: priceFilter,
        },
      });

      setVegs(response.data);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };


  const productList =
    loading ? (
      'Loading...'
    ) : vegs.length === 0 ? (
      'No matching products found.'
    ) : (
      vegs.map((item, k) => (
        <ProductCard key={k} product={item} addToCart={() => addToCart(item._id, item.name, item.price)} />
      ))
    );

  return (
    <div>
      <div className="flex grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="flex-grow  ">
          <div className="flex space-x-0">
            <button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold">
              Vegetables
            </button>

            <button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold">
              Fruits
            </button>

            <button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold">
              Flowers
            </button>

            <button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold">
              Home Made
            </button>
          </div>
        </div>

        <div className="form-container flex">
          <form onSubmit={handleFilterSubmit} className="w-full flex">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-10 border rounded mr-4"
            />

            <select value={categoryFilter} onChange={handleCategoryChange} className="w-full h-10 border rounded mr-4">
              <option value="">All Categories</option>
              <option value="Fruit">Fruit</option>
            </select>
            <input
              type="number"
              placeholder="Max Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full h-10 border rounded mr-4"
            />
            <button type="submit" className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productList}
      </div>
    </div>

  );
}
export default ProductList;