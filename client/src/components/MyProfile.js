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

  const productList =
  vegs.length === 0
    ? 'There is no product record!'
    : vegs.map((item, k) => <ProductCard product={item} key={k}/>);

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>
                My Products
                </h3>
                <div className='grid-container'>
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