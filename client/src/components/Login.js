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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8082/login", {
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
      window.localStorage.setItem("token", sdata.data);
    } else if (sdata.status == "error") {
      alert("Login Unsuccessful, Enter Valid Details");
    }
    console.log(sdata);
  };

  return (
      <Container>
        <Row className="mt-4">

          <Col style={{ marginTop: "8%" }} md="6">
            <Card color="light">
              <CardHeader>
                <h3>Enter Details to Log-In</h3>
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
  );
};
export default Login;
