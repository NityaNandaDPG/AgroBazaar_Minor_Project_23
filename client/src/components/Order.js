import React from 'react';

const Order = (cart) => {
    // Retrieve the cart data passed through navigation or Redux
    const cart = []; // Replace with actual cart data from the navigation props or Redux store

    // You can also retrieve other necessary data related to the order, like user information, shipping address, etc.

    return (
        <div className="bg-white rounded p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map((item, index) => (
                <div key={index} className="mb-4">
                    <div className="flex items-center justify-between">
                        <div className="w-2/5">
                            <span>{item.productName}</span>
                        </div>
                        <div className="w-2/5">
                            <span>Quantity: {item.quantity}</span>
                        </div>
                        <div className="w-1/5 text-right">
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="mt-4">
                <strong>Total Price: ₹{calculateTotalPrice(cart).toFixed(2)}</strong>
            </div>
            {/* Additional order details and form can be added here */}
        </div>
    );
};

export default Order;

// Helper function to calculate total price
const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
