import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const PaymentOrder = () => {
    const id = useSelector((state) => state.user._id);
    const [cart, setCart] = useState([]);
    const [paymentData, setPaymentData] = useState({
        paymentId: "",
        token: "",
        payerId: ""
    });

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPaymentData({
            paymentId: params.get('paymentId'),
            token: params.get('token'),
            payerId: params.get('PayerID')
        });
    }, [location.search]);

    useEffect(() => {
        if (!paymentData.paymentId) {
            return;
        }

        axios
            .get(`http://localhost:8082/add2cart/${id}`)
            .then((res) => {
                setCart(res.data);

            })
            .catch((error) => {
                console.error("Failed to fetch cart products:", error.message);
            });
    }, [id, paymentData.paymentId]);

    useEffect(() => {
        console.log("Payment Id: " + paymentData.paymentId);

        if (!paymentData.paymentId || cart.length === 0) {
            return;
        }

        axios.put(`http://localhost:8082/order/new/${id}/${paymentData.paymentId}`,cart)
            .then((res) => {
                //content
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [id, paymentData.paymentId, cart]);

    return (
        <div>
            <h3>Order Placed</h3>
            <h4>Payment Id: {paymentData.paymentId}</h4>
        </div>
    );
};

export default PaymentOrder;
