import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProductCard from './ProductCard';

import toast, { Toaster } from 'react-hot-toast';

function ProductList() {
  const id = useSelector((state) => state.user._id);
  const [vegs, setVegs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8082/products/all');
        setVegs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error from Server:', error);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (productId, p_name, price) => {
    try {
      await axios.put(`http://localhost:8082/add2cart/${id}`, {
        productId,
        p_name,
        price,
      });
  
      // Show success message using React Hot Toast
      console.log("Item added to cart successfully!")
      toast.success('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You can also show an error message if needed
      toast.error('Error adding item to cart');
    }
  };

  useEffect(() => {
    console.log("Updated veggies:", vegs);
  }, [vegs]); // This useEffect will run every time vegs changes

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleFilterSubmit = () => {
    // Filter the products based on searchTerm and categoryFilter
    const filteredProducts = vegs.filter((product) => {
      const matchesSearchTerm = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      return matchesSearchTerm && matchesCategory;
    });

    setVegs(filteredProducts);
    console.log("Search complete");
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
        <div className="flex-grow">
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
              id="searchTerm"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-10 border rounded mr-4"
            />
    
            <select
            id="categoryFilter"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full h-10 border rounded mr-4"
            >
              <option value=""></option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
            </select>
            <input
              type="number"
              placeholder="Max Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full h-10 border rounded mr-4"
            />
            <button
              type="button"
              onClick={handleFilterSubmit}
              className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productList}
      </div>
      <Toaster />
    </div>
    
  );
}

export default ProductList;