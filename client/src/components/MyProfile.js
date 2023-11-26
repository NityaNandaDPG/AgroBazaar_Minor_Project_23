import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { Navigate, useNavigate, Route } from "react-router-dom";
import axios from 'axios';

const MyProfile = () => {
  const email = useSelector((state) => state.user.email);
  // const isLoggedIn=window.localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRedux());
    window.localStorage.setItem("token", false);
    window.localStorage.removeItem("token");
    alert("Logout Out Successfull");
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    avatar: "",
    address: {
        street: "",
        city: "",
        state: "",
        country: "",
        pin: "",
    },
});

  useEffect(() => {
    axios
      .get(`http://localhost:8082/auth/getUser/${email}`)
      .then((res) => {
        setData({
          _id: res.data._id,
          username: res.data.username,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          avatar: res.data.avatar,
          gender: res.data.gender,
          address: res.data.address,
        });
      })
      .catch((err) => {
        console.log('Error from getting profile data!');
      });
  }, []);

  const handleEditClick = () => {

    setIsEditMode(true);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(`http://localhost:8082/auth/updateUser/${email}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        console.error('Empty response received');
      }
      setData(response.data);
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    }
    setIsEditMode(false);
  };

  const handleChange = (e, property) => {
    setData({ ...data, [property]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
          <div className="flex items-center">
            <span className="mr-2">{data.firstname}</span>
            {isEditMode && (
              <input
                type="text"
                name="firstname"
                value={data.firstname}
                onChange={(e) => handleChange(e, "firstname")}
                className="border rounded px-2 py-1"
              />
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
          <div className="flex items-center">
            <span className="mr-2">{data.lastname}</span>
            {isEditMode && (
              <input
                type="text"
                name="lastname"
                value={data.lastname}
                onChange={(e) => handleChange(e, "lastname")}
                className="border rounded px-2 py-1"
              />
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <div className="flex items-center">
            <span className="mr-2">{data.email}</span>
            {isEditMode && (
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={(e) => handleChange(e, "email")}
                className="border rounded px-2 py-1"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          {!isEditMode ? (
            <button
              type="button"
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUpdateClick}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MyProfile;