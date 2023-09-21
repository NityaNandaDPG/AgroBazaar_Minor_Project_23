import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice"; // Correct import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = useSelector((state) => state);
  console.log(userData);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8082/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const sdata = await response.json();
    if (sdata.status == "ok") {
      alert("Login Successful");

      window.localStorage.setItem("token", true);
      dispatch(loginRedux(sdata));
      console.log(userData);
    } else if (sdata.status == "error") {
      alert("Login Unsuccessful, Enter Valid Details");
    }
  };

  return (
    // <Base>
    <Container>
      <Row className="mt-4">
        <Col md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Photo"
            className="img-fluid"
          />
        </Col>
        <Col style={{ marginTop: "6%" }} md="6">
          <Card color="light">
            <CardHeader>
              <h3>Enter Details to Log-In</h3>
              <div
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
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Enter Here..."
                    onChange={(e) => setEmail(e.target.value)} // Step 3: Use setEmail
                    value={email}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter Here..."
                    onChange={(e) => setPassword(e.target.value)} // Step 3: Use setPassword
                    value={password}
                  ></Input>
                </FormGroup>
                <Container className="text-center">
                  <Button onClick={handleSubmit} color="kight" outline>
                    Login
                  </Button>
                  <Button className="ms-2" color="secondary">
                    Forgot Password?
                  </Button>
                </Container>
              </Form>
              <p style={{ marginTop: "2%" }}>
                <a href="/signup">Don't have account..Sign Up?</a>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    // </Base>
  );
};
export default Login;
