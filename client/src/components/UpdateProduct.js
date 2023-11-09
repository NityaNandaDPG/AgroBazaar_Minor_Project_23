import { useEffect, useState } from "react";
import { useNavigate, useParams, redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsCloudUpload } from "react-icons/bs";
// import { imgtobase } from "../utility/imgtobase";
import axios from 'axios';

const UpdateProduct = () => {
    const id = useSelector((state) => state.user._id);
    const [vegs, setVegs] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        id:"",
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
    });

    const [error, setError] = useState({
        error: {},
        isError: false,
    });
    // const [users, setusers] = useState([]);

    const { productId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8082/products/all/${productId}`)
            .then((res) => {
                setData({
                    id:res.data.id,
                    name: res.data.name,
                    category:res.data.category,
                    image:res.data.image,
                    price:res.data.price,
                    description: res.data.description,
                });
            })
            .catch((err) => {
                console.log('Error from Update Product');
            });
    }, [id]);

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    const resetData = () => {
        setData({
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Read the selected file as a Data URL (Base64)
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result;
                setData({ ...data, image: base64String });
            };
            reader.readAsDataURL(file);
        }
    };
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            // const randomPartOfId = Math.floor(Math.random() * 10000);
            // const productID = `${data.category}-${randomPartOfId}`;
            // data.id = productID;
            const response = await axios.put(`http://localhost:8082/products/new/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const sdata = await response.data;
            if (sdata.status === "ok") {
                alert("Post Successful");
                resetData();
                navigate("/myproduct");
            } else {
                alert(sdata.err || "An error occurred during Posting.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("An error occurred during posting. Please try again later.");
        }
    };

    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you
                        share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        required
                                        autoComplete="name"
                                        onChange={(e) => handleChange(e, "name")}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter Title"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={data.description}
                                        required
                                        autoComplete="description"
                                        onChange={(e) => handleChange(e, "description")}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter your new password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    autoComplete="off"
                                    value={data.category}
                                    onChange={(e) => handleChange(e, "category")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="Fruit">Fruit</option>
                                    <option value="Vegetable">Vegetable</option>
                                    <option value="Home Made">Home Made</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={data.price}
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e, "price")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image">
                                Image
                                <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
                                    {data.image ? (
                                        <img src={data.image} className="h-full" alt="Product" />
                                    ) : (
                                        <span className="text-5xl">
                                            <BsCloudUpload />
                                        </span>
                                    )}
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
};
export default UpdateProduct;
