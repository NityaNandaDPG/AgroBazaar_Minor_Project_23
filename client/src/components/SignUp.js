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
  import { useEffect, useState } from "react";
  import { Navigate, redirect, useHistory } from "react-router-dom";
  
  const SignUp = () => {
    //const [selectedType, setSelectedType] = useState("option1");
  
    const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      Type: "",
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
      });
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:8080/demo", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const sdata = await response.json();
      if (sdata.status == "ok") {
        alert("Sign Up Successful. Kindly Login");
  
        <Navigate to="/Login" replace={true} />;
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
  
    const [selectedOption, setSelectedOption] = useState("option1");
  
    // const handleSelectChange = (e) => {
    //   setSelectedOption(e.target.value);
    // };
  
    return (

        <Container
          style={{
            backgroundImage: ` url(
              "https://www.collegebatch.com/static/clg-gallery/kalyani-government-engineering-college-nadia-213555.jpg"
            )`,
            filter: "grayscale(100%)",
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
                        onChange={(e) => handleChange(e, "select")}
                        value={data.select}
                        required
                      >
                        <option disabled="">Choose Option...</option>
                        <option value="option1">Farmer</option>
                        <option value="option2">Buyer</option>
                      </Input>
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
    );
  };
  export default SignUp;
  