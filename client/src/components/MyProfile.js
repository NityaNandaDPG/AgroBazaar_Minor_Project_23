import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, CardHeader, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { Navigate, useNavigate, Route } from "react-router-dom";
// import Update from "./Update";

const MyProfile = () => {
  const userData = useSelector((state) => state.user);
  console.log("id is");
  console.log(userData._id);

  const isLoggedIn = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutRedux());
    alert("Logout Out Successfull");
    window.localStorage.setItem("token", false);
  };
  useEffect(() => {
    // Fetch updated user data when the component mounts
    // You can dispatch an action to refresh user data here if needed
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
                {/* <p>City: {userData.City}</p> */}
                {/* <p>State: {userData.State}</p> */}
                {/* <p>Pin: {userData.Pin}</p> */}
                {/* Add other user data fields here */}
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
    </Container>
  );
};

export default MyProfile;
