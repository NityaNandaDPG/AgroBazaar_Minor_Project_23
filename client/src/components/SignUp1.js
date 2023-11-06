import { useEffect, useState } from "react";
import { useNavigate, redirect, useHistory } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { BsCloudUpload } from "react-icons/bs";

const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "Male",
        dob: "",
        avatar: "",
        type: "Farmer",
        address: {
        street: "",
        city: "",
        state: "",
        country: "India",
        pin: "",
        },
    });
    const [error, setError] = useState({
        error: {},
        isError: false,
    });
    const [users, setusers] = useState([]);
    useEffect(() => {
        // console.log(data);
    }, [data]);

    const statesOfIndia = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Jammu and Kashmir",
        "Ladakh",
    ];

    const handleChange = (event, property) => {
        if (property === "address") {
        setData({
            ...data,
            address: {
            ...data.address,
            [event.target.name]: event.target.value,
            },
        });
        } else {
        setData({ ...data, [property]: event.target.value });
        }
    };

    const resetData = () => {
        setData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
        avatar: "",
        type: "",
        address: {
            street: "",
            city: "",
            state: "",
            country: "India",
            pin: "",
        },
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
        // Read the selected file as a Data URL (Base64)
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target.result;
            setData({ ...data, avatar: base64String });
        };
        reader.readAsDataURL(file);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:8082/auth/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const sdata = await response.json();
        if (sdata.status === "ok") {
            alert("Sign Up Successful. Kindly Login");
            resetData();
            navigate("/login");
        } else {
            alert(sdata.err || "An error occurred during signup.");
        }
        } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during signup. Please try again later.");
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
                    Username
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        autoComplete="username"
                        onChange={(e) => handleChange(e, "username")}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter your username"
                    />
                    </div>
                </div>
                </div>

                <div className="sm:col-span-4">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Password
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete="password"
                        onChange={(e) => handleChange(e, "password")}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter your new password"
                    />
                    </div>
                </div>
                </div>


                <div className="col-span-full">
                <label htmlFor="avatar">
                    Avatar
                    <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
                    {data.avatar ? (
                        <img src={data.avatar} className="h-full" alt="Product" />
                    ) : (
                        <span className="text-5xl">
                        <BsCloudUpload />
                        </span>
                    )}
                    <input
                        type="file"
                        id="avatar"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    </div>
                </label>
                </div>
            </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    First Name
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    required
                    autoComplete="given-name"
                    onChange={(e) => handleChange(e, "firstname")}
                    value={data.firstname}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Last Name
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    required
                    autoComplete="family-name"
                    onChange={(e) => handleChange(e, "lastname")}
                    value={data.lastname}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Gender
                </label>
                <div className="mt-2">
                    <select
                    id="gender"
                    name="gender"
                    autoComplete="off"
                    value={data.gender}
                    required
                    onChange={(e) => handleChange(e, "gender")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                    </select>
                </div>
                </div>

                <div className="sm:col-span-3">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Date of Birth
                </label>
                <div className="mt-2">
                    <input
                    id="dob"
                    name="dob"
                    type="date"
                    autoComplete="off"
                    required
                    onChange={(e) => handleChange(e, "dob")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="col-span-full">
                <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Street Address
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="street"
                    id="street-address"
                    autoComplete="street-address"
                    onChange={(e) => handleChange(e, "address")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    City
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    onChange={(e) => handleChange(e, "address")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2">
                <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    State
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="address-level1"
                    onChange={(e) => handleChange(e, "address")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2">
                <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Pin
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="pin"
                    id="pin"
                    autoComplete="postal-code"
                    onChange={(e) => handleChange(e, "address")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Country
                </label>
                <div className="mt-2">
                    <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={data.country}
                    onChange={(e) => handleChange(e, "address")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                    <option>India</option>
                    </select>
                </div>
                </div>

                <div className="sm:col-span-3">
                <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Type
                </label>
                <div className="mt-2">
                    <select
                    id="type"
                    name="type"
                    required
                    autoComplete="off"
                    value={data.type}
                    onChange={(e) => handleChange(e, "type")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                    <option value="Farmer">Farmer</option>
                    <option value="Consumer">Consumer</option>
                    </select>
                </div>
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
export default Signup;
