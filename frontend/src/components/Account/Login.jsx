import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [register, setRegister] = useState(true);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setVariant("danger");
      setMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);
    fetch("http://localhost:1111/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "PASS") {
          localStorage.setItem("name", res.user.fullname);
          localStorage.setItem("token", res.token);
          setVariant("success");
          setMessage("Login successful! Redirecting...");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          setVariant("danger");
          setMessage(res.message || "Login failed");
        }
      })
      .catch((err) => {
        setVariant("danger");
        setMessage("Error: " + err.message);
      })
      .finally(() => setLoading(false));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      setVariant("danger");
      setMessage("Please fill in all fields.");
      return;
    }
    setLoading(true);
    fetch("http://localhost:1111/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "PASS") {
          setVariant("success");
          setMessage("Registration successful! Redirecting to login…");
          setTimeout(() => {
            setRegister(true);
            setMessage("");
          }, 2000);
        } else {
          setVariant("danger");
          setMessage(res.message || "Registration failed");
        }
      })
      .catch((err) => {
        setVariant("danger");
        setMessage("Error: " + err.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0">
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-center p-5"
          style={{
            background: "linear-gradient(135deg, #1A237E, #3949AB)",
            color: "#fff",
          }}
        >
          <div className="text-center">
            <h2 className="display-4 fw-bold">Welcome to EduStar Academy</h2>
            <p className="lead mt-4">
              Shaping young minds with care, curiosity, and commitment.
            </p>
            <img
              src="https://img.freepik.com/free-vector/school-logo-template_23-2147503355.jpg"
              alt="school logo"
              style={{ width: "200px", marginTop: "20px" }}
            />
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-center align-items-center bg-light"
        >
          <Card
            className="p-4 shadow w-100"
            style={{
              maxWidth: "500px",
              background: "linear-gradient(135deg, #ECEFF1, #F3F4F6)",
              border: "none",
              borderRadius: "16px",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "#1A237E" }}>
              {register ? "Login" : "Register"}
            </h2>
            {message && (
              <Alert
                variant={variant}
                onClose={() => setMessage("")}
                dismissible
              >
                {message}
              </Alert>
            )}
            <Form onSubmit={register ? handleLogin : handleRegister}>
              {!register && (
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={register ? "Password" : "Create password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #F9A825, #FFB300)",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />{" "}
                    {register ? "Logging in..." : "Registering..."}
                  </>
                ) : register ? (
                  "Login"
                ) : (
                  "Register"
                )}
              </Button>
              <Row>
                <Col xs={6}>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    onClick={() => setRegister(!register)}
                  >
                    {register ? "Register" : "Back to Login"}
                  </Button>
                </Col>
                {register && (
                  <Col xs={6}>
                    <Button
                      variant="outline-info"
                      className="w-100"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password
                    </Button>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
