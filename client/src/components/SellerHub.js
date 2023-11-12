import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Outlet,Link } from 'react-router-dom';

const SellerHub = () => {
    const id = useSelector((state) => state.user._id);
    const [sellerInfo, setSellerInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newSellerName, setNewSellerName] = useState('');

    const fetchSellerInfo = () => {
        axios
            .get(`http://localhost:8082/seller/seller-info/${id}`)
            .then((response) => {
                setSellerInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchSellerInfo();
    }, [id]);

    useEffect(() => {
        // Add a check to avoid unnecessary re-fetching of seller info
        if (isEditing || sellerInfo.products) {
            fetchSellerInfo();
        }
    }, [isEditing, sellerInfo.products]);

    const handleBecomeSeller = () => {
        setIsEditing(true);
    };

    const handleSaveSellerInfo = () => {
        axios
            .post(`http://localhost:8082/seller/create-seller-info`, {
                id: id,
                name: newSellerName,
            })
            .then((response) => {
                setSellerInfo(response.data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addProductToSeller = async (userId, product) => {
        try {
            const response = await axios.post(`http://localhost:8082/seller/add-product/${userId}`, {
                product: product,
            });

            console.log('Product added:', response.data);

            // Update sellerInfo by fetching the latest data
            fetchSellerInfo();
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle the error
        }
    };

    const newProduct = {
        id: 'product_id',
        name: 'Product Name',
        category: 'Fruit',
        price: 10.99,
        description: 'Product description',
    };

    return (
        <div>
            {sellerInfo.name ? (
                <div>
                    <h1>Seller Name: {sellerInfo.name}</h1>
                    <button onClick={() => addProductToSeller(id, newProduct)}>Add Product</button>
                    <h2>Products:</h2>
                    <ul>
                        {sellerInfo.products &&
                            sellerInfo.products.map((item,i) => (
                                // <li key={i}>
                                //     {product.name} - ${product.price}
                                // </li>
                                <tr key={i}>
                                <td className="px-4 py-2">
                                    <img
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-12 h-12 object-cover"
                                    />
                                </td>
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.description}</td>
                                <td className="px-4 py-2">{item.price}</td>
                                <td className="px-4 py-2">
                                    <Link className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 mr-2"
                                        to={`/updateproduct2/${item.id}`}>
                                        Modify
                                    </Link>
    
                                    {/* <Link className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                                        onClick={() => handleDeleteClick(item.id)}
                                    >
                                        Delete
                                    </Link> */}
                                </td>
                            </tr>
                            ))}
                    </ul>
                </div>
            ) : (
                <div>
                    {isEditing ? (
                        <div>
                            <label>
                                Seller Name:
                                <input
                                    type="text"
                                    value={newSellerName}
                                    onChange={(e) => setNewSellerName(e.target.value)}
                                />
                            </label>
                            <button onClick={handleSaveSellerInfo}>Save</button>
                        </div>
                    ) : (
                        <button onClick={handleBecomeSeller}>Become a Seller</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SellerHub;
