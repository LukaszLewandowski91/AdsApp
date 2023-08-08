import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { API_AUTH_URL } from "../../../config";
import { useForm } from "react-hook-form";
const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError, loginError
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login, password, phone, avatar);
    setLoginError(!loginError);
    setPasswordError(!passwordError);
    setPhoneError(!phoneError);
    setAvatarError(!avatarError);
    if (login && password && phone && avatar) {
      const fd = new FormData();
      fd.append("login", login);
      fd.append("password", password);
      fd.append("phoneNumber", phone);
      fd.append("avatar", avatar);

      const options = {
        method: "POST",
        body: fd,
      };
      setStatus("loading");
      fetch(`${API_AUTH_URL}/register`, options).then((res) => {
        if (res.status === 201) {
          setStatus("success");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      });
    }
  };
  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Sign up</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success !</Alert.Heading>
          <p>You have been successfully registered. You can now log in...</p>
        </Alert>
      )}

      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You have to fill all the filds</p>
        </Alert>
      )}

      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Enter login"
        />
        {loginError && !login && (
          <small className="d-block form-text text-danger mt-2">
            Login is required
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        {passwordError && !password && (
          <small className="d-block form-text text-danger mt-2">
            Password is required
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />
        {phoneError && !phone && (
          <small className="d-block form-text text-danger mt-2">
            Phone number is required
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAvatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {avatarError && !avatar && (
          <small className="d-block form-text text-danger mt-2">
            Avatar is required
          </small>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
