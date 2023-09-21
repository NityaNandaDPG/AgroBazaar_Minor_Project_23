import {
  Container,
  Form,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { imgtobase } from "../utility/imgtobase";
import { useEffect, useState } from "react";
import { useNavigate, redirect, useHistory } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    Type: "",
    image: "",
  });
  const [error, setError] = useState({
    error: {},
    isError: false,
  });
  const [users, setusers] = useState([]);
  useEffect(() => {
    // console.log(data);
  }, [data]);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      Type: "",
      image: "",
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
    const response = await fetch("http://localhost:8082/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const sdata = await response.json();
    if (sdata.status == "ok") {
      alert("Sign Up Successful. Kindly Login");

      navigate("/Login");
    } else {
      alert(sdata.err);
    }
    console.log(sdata);
  };

  const getuser = async () => {
    const response = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });
    const sdata = await response.json();
    setusers(sdata);
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    // <Base>
    <Container
      style={{
        backgroundImage: `url(/img/image.jpg)`,
      }}
    >
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card
            style={{
              backgroundColor: "white",
              opacity: 0.7,
            }}
          >
            <CardHeader>
              <h1> Fill Information To Register</h1>
              <div
                className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="img/loginsignup.gif"
                  alt="Signup Logo"
                  className="signup-logo"
                  style={{
                    filter: "none",
                    width: "60px",
                    height: "auto",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </CardHeader>

            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="name">Enter Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter Name Here..!"
                    id="name"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter Email Here..!"
                    id="email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter Password Here..!"
                    id="password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Type">Type</Label>

                  <Input
                    type="select"
                    id="select"
                    onChange={(e) => handleChange(e, "Type")}
                    value={data.Type}
                    required
                  >
                    <option disabled="">Choose Option...</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Buyer">Buyer</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="file">Profile Picture</Label>
                  <Label for="profilePicture">Profile Picture</Label>
                  <Input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button onClick={submitForm} color="dark">
                    Register
                  </Button>

                  <p style={{ marginTop: "2%" }}>
                    <a href="/Login">Have an account..Log In?</a>
                  </p>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    // </Base>
  );
};
export default Signup;
