const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");

router.put("/new/:userId/:paymentId", async (req, res) => {
    const userId = req.params.userId;
    const paymentId = req.params.paymentId;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    'orders': {
                        cart: req.body,
                        payment_id: paymentId
                    }
                }
            },
            { new: true, useFindAndModify: false }
        );

        console.log('User updated successfully:', updatedUser);

        for (const order of req.body) {
            const sellerId = order.seller_id;
            const seller = await User.findById(sellerId);

            if (seller) {
                const updatedSeller = await User.findByIdAndUpdate(
                    sellerId,
                    {
                        $push: {
                            'consumer_orders': {
                                cart: req.body,
                                payment_id: paymentId,
                                consumer_id: userId // Optionally, you may want to store the buyer's ID for reference
                            }
                        }
                    },
                    { new: true, useFindAndModify: false }
                );

                console.log('Seller updated successfully:', updatedSeller);
            } else {
                console.error('Seller not found');
                res.status(404).json({ error: 'Seller not found' });
                return;
            }
        }

        res.status(200).json({ message: 'User and seller updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user and seller:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:userId', async (req, res) => {
    console.log("Orders: " + req.params.userId)
    try {
        const user = await User.findById(req.params.userId);
        res.json(user.orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/consumer_orders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const consumerOrders = user.consumer_orders;
        res.json(consumerOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;