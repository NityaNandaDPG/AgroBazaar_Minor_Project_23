const express = require('express');
const bodyParser = require('body-parser');
const cart = express.Router();
const User=require('../../models/User.js');

cart.use(bodyParser.json());

cart.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartProducts = user.cart.map(item => {
            return {
                productId: item.product,
                quantity: item.quantity,
            };
        });

        res.status(200).json(cartProducts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


cart.put('/:id', async (req, res) => {
    const { productId } = req.body;
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const productExists = user.products.some(product => product.id === productId);
        console.log(productExists);
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found in user\'s products' });
        }

        user.cart.push({ product: productId, quantity: 1 });
        await user.save();
        res.status(200).json({ status: "ok", message: 'Product is added to cart successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

cart.put('/update', async (req, res) => {
    try {
        const { userId, productId, newQuantity } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        const cartItem = user.cart.find(item => item.product.toString() === productId);
    
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in user\'s cart' });
        }
        cartItem.quantity = newQuantity;
        await user.save();
        res.status(200).json({ cart: user.cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


cart.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        const index = user.cart.findIndex(item => item.product.toString() === productId);
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found in user\'s cart' });
        }
    
        user.cart.splice(index, 1);
        await user.save();
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports=cart;