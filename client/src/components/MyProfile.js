import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, CardHeader } from "reactstrap";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const userData = useSelector((state) => state.user);
  const isLoggedIn = window.localStorage.getItem("token");

  return (
    <Container>
      <Card>
        <CardHeader>
          <h1>My Profile</h1>
        </CardHeader>
        <CardBody>
          {isLoggedIn ? (
            <>
              <div>
                <img
                  src={userData.image} // Assuming the image URL is stored in userData.image
                  alt="Profile Picture"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
              <div>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Type: {userData.Type}</p>
                {/* Add other user data fields here */}
              </div>
            </>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default MyProfile;
