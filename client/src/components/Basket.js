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
            // cart.map(product => {
            //     console.log(`Product ID: ${product.productId}, Quantity: ${product.quantity}`);
            // });
        })
        .catch(error => {
            console.error('Failed to fetch cart products:', error.message);
        });
        }, []);

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
        axios.put('http://localhost:8082/add2cart/update', { id, productId, newQuantity })
        .then(response => {
            const updatedCart = response.data.cart;
            setCart(updatedCart);
        })
        .catch(error => {
            console.error('Failed to update quantity:', error.message);
        });
    };

    return (
        <div className="bg-white rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                {cart.map((item,i) => (
                    <li key={i}>
                        <p>{item}</p>
                        <div className="flex justify-between items-center mb-2">
                            <span>{item.product}</span>
                            <div className="flex items-center space-x-2">
                                <button className="text-red-500"
                                onClick={() => removeFromCart(item.product)}>
                                    Remove
                                </button>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product, e.target.value)}
                                    className="w-16 p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
};

export default Basket;
