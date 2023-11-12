import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation, redirect, useHistory } from "react-router-dom";
import axios from 'axios';

const ProductPreview = () => {
    const id = useSelector((state) => state.user._id);

    const [data, setData] = useState({
        // id:"",
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
    });

    const { productId } = useParams();
    console.log("Param Id: "+productId)

    useEffect(() => {
        axios
            .get(`http://localhost:8082/products/all/${productId}`)
            .then((res) => {
                setData({
                    id:res.data._id,
                    name: res.data.name,
                    category: res.data.category,
                    image: res.data.image,
                    price: res.data.price,
                    description: res.data.description,
                });
            })
            .catch((err) => {
                console.log('Faild to  fetch Product');
            });
    }, [productId]);



    const addToCart = (productId, p_name, price) => {
        return axios.put(`http://localhost:8082/add2cart/${id}`, {
            productId,
            p_name,
            price,
        })
            .then(response => {
                // Handle success
                console.log('Successfully added to cart:', response.data);
                alert('Successfully added to cart:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error adding to cart:', error);
                alert("Failed to add to Cart");
            });
    };



    return (
        <div>
            <img src={data.image} alt={data.name} />
            <h1>{data.name}</h1>
            <p>Price: ₹{data.price}</p>
            <button onClick={()=>addToCart(data._id,data.name,data.price)}>Add to Cart</button>
            <div>Desciption:</div>
            <p>{data.description}</p>
            <div>Seller:</div>


            {/* Add more details and styling as needed */}
        </div>
    );
};

export default ProductPreview;