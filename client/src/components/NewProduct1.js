import { useEffect, useState } from "react";
import { useNavigate, redirect, useHistory,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsCloudUpload } from "react-icons/bs";
import { imgtobase } from "../utility/imgtobase";
import axios from 'axios';

const NewProduct1=()=>{
    const id= useSelector((state) => state.user._id);
    // const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        id:"",
        name: "",
        category: "Fruit",
        image: "",
        price: "",
        description: "",
    });

    const [error, setError] = useState({
        error: {},
        isError: false,
    });
    const [users, setusers] = useState([]);
    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    const resetData = () => {
        setData({
            id:"",
            name: "",
            category: "",
            image: "",
            price: "",
            description: "",
        });
    };

    const handleFileChange = async (e) => {
        const data = await imgtobase(e.target.files[0]);
        setData({ ...data, image: data});
        }

    const submitForm = async (e) => {
        e.preventDefault();
        try{
            const randomPartOfId = Math.floor(Math.random() * 10000);
            const productID = `${data.category}-${randomPartOfId}`;
            data.id = productID;
            const response = await axios.put(`http://localhost:8082/products/new/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const sdata = response.data;
            if (sdata.status === "ok") {
                alert("Post Successful");
                resetData();
                navigate("/profile");
            }
            else {
                alert(sdata.err || "An error occurred during Posting.");
                console.log(sdata);
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("An error occurred during post. Please try again later.");
        }
    };

    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
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
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        required
                                        autoComplete="description"
                                        onChange={(e) => handleChange(e, "description")}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Enter description"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    autoComplete="off"
                                    value={data.category}
                                    onChange={(e)=>handleChange(e,"category")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="Fruit">Fruit</option>
                                        <option value="Vegetable">Vegetable</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                                <div className="mt-2">
                                    <input
                                    type="number"
                                    name="price"
                                    required
                                    id="price"
                                    autoComplete="off"
                                    onChange={(e)=>handleChange(e,"price")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Avatar
                            </label>
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
                                // value={data.image}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
export default NewProduct1;