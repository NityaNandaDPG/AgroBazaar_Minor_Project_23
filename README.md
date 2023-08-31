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
import Base from "./Base";
import { useState } from "react";

const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, property) => {
    setdata({ ...data, [property]: event.target.value });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Photo"
              className="img-fluid"
            />
          </Col>
          <Col style={{ marginTop: "8%" }} md="6">
            <Card color="light">
              <CardHeader>
                <h3>Enter Details to Log-In</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter Here..."
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter Here..."
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                    ></Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="kight" outline>
                      Login
                    </Button>
                    <Button className="ms-2" color="secondary">
                      Forgot Password?
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};
export default Login;
