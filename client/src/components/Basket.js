import React, {useEffect, useState } from 'react';
import { useSelector} from "react-redux";
import axios from 'axios';

const Basket = () => {
    const id= useSelector((state) => state.user._id);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8082/add2cart/${id}`)
        .then(res => {
            setCart(res.data);
        })
        .catch(error => {
            console.error('Failed to fetch cart products:', error.message);
        });
        }, [cart]);


    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:8082/add2cart/${id}/remove/${productId}`)
            .then(response => {
                console.log("Remove successfully!");
            })
            .catch(error => {
                console.error('Failed to remove product from cart:', error.message);
            });
    };

    const updateQuantity = (productId, newQuantity) => {
        axios.put(`http://localhost:8082/add2cart/${id}/update/${productId}/${newQuantity}`)
        .then(response => {
            const updatedCart = response.data.cart;
            setCart(updatedCart);
            console.log("Quantity Updated successfully!");
        })
        .catch(error => {
            console.error('Failed to update quantity:', error.message);
        });
    };


    function getProduct(productId) {
        axios.get(`http://localhost:8082/products/all/${productId}`)
            .then(response => {
                return response.data;
            })
            .catch (error => {
                console.error('Failed to fetch product name:', error.message);
                return 'Product Name Not Found';
            });
    }

    if (!cart) {
        return <p>Loading...</p>;
    }

    if (cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }


    return (
        <div className="bg-white rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <ul>
            {cart.map((item,i) => (
                <li key={i}>
                    <div className="flex justify-between items-center mb-2">
                        <span>{item._id}</span>
                        {/* <span>{productName}</span> */}
                        {/* <span>{getProductName(item._id)}</span> */}
                        <div className="flex items-center space-x-2">
                            <button className="text-red-500"
                            onClick={() => removeFromCart(item._id)}>
                                Remove
                            </button>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item._id, e.target.value)}
                                className="w-16 p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default Basket;
