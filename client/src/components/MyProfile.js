import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, CardHeader, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { Navigate, useNavigate, Route } from "react-router-dom";
import axios from 'axios';
import ProductCard from './ProductCard';

const MyProfile = () => {
  const userData=useSelector((state) => state.user);
  const id= useSelector((state) => state.user._id);
  const [vegs, setVegs] = useState([]);
  // const isLoggedIn=window.localStorage.getItem("token");
  const dispatch=useDispatch();
  try{
    axios
    .get(`http://localhost:8082/products/${id}`)
    .then((res) => {
      setVegs(res.data);
    })
    .catch((err) => {
      console.log('Error from Server');
    });


  }
  catch(error){
    console.log('Error from Server');
  }

  const productList =(
<table className="table-auto w-full ">
  <thead>
    <tr>
      <th className="px-4 py-2">Image</th>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Description</th>
      <th className="px-4 py-2">Price</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {vegs.length === 0 ? (
      <tr>
        <td className="px-4 py-2" colSpan="4">
          There is no product record!
        </td>
      </tr>
    ) : (
      vegs.map((item, k) => (
        <tr key={k}>
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
            <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 mr-2">
              Modify
            </button>
            <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

    );

  const handleLogout=()=>{
    dispatch(logoutRedux());
    window.localStorage.setItem("token", false);
    window.localStorage.removeItem("token");
    alert("Logout Out Successfull");
  };
  
  useEffect(() => {
  }, [userData._id, dispatch]);

  const handleEditDetails = () => {};
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <CardHeader>
          <h1>My Profile</h1>
        </CardHeader>
        <CardBody>
          {!userData.isAuthenticated ? (
            <p>Please log in to view your profile.</p>
          ) : (
            <>
              <div>
                <img
                  src={userData.avatar} // Assuming the image URL is stored in userData.image
                  alt="Profile Picture"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
              <div>
                <p>Name: {userData.firstname} {userData.lastname}</p>
                <p>Email: {userData.email}</p>
                <p>Address: {userData.address}</p>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div>
            {userData.isAuthenticated? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button onClick={handleLogout} color="dark">
                  Logout
                </Button>

                <Button
                  // onClick={() => navigate(`/update/${userData._id}`)}
                  color="dark"
                >
                  Edit Details
                </Button>
                <Button onClick={() => navigate("/form")} color="dark">
                  Post A Product
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div>
            {userData.isAuthenticated? (
              <div>
                <h3 className="bg-gray-800 text-white py-4 text-xl font-semibold text-center">
                My Products
                </h3>
                <div>
                  {productList}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default MyProfile;