import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Login = () => {
  useTitle("Login");

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate("/dash");
    } catch (err) {
      const message = err.data?.message || "An error occurred";
      setErrMsg(message);
      errRef.current.focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) return <PulseLoader color="#FFF" />;

  return (
    <section className="container-fluid d-flex flex-column min-vh-100 text-center">
      <Navbar />
      <header className="mt-3 mb-4">
        <h1>Login</h1>
      </header>
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Card style={{ maxWidth: "600px", width:"100%" }} className="shadow">
          <Card.Body>
            <form onSubmit={handleSubmit}>
              {errMsg && (
                <div ref={errRef} className="alert alert-danger" role="alert">
                  {errMsg}
                </div>
              )}
              <div className="mb-3 text-start">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  ref={userRef}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-3 text-start">
                <InputGroup>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
              </div>
              <div className="mb-3 form-check text-start">
                <input
                  type="checkbox"
                  id="persist"
                  className="form-check-input"
                  checked={persist}
                  onChange={() => setPersist((prev) => !prev)}
                />
                <label className="form-check-label" htmlFor="persist">
                  Trust This Device
                </label>
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" as={Link} to="/">
                  Back to Home
                </Button>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default Login;
