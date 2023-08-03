import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const MainMenu = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  // const options = {
  //   method: "GET",
  //   credentials: "include",
  // };
  // fetch(`${API_URL}auth/user`, options).then((res) => {
  //   console.log("logged ", res);
  // });

  // const user = useSelector(getUser);
  // console.log("uzytkownik", user);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Navbar.Brand href="/">Ads App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link>
            <Link to="/" className="text-white-50">
              Home
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/login" className="text-white-50">
              Sign In
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/logout" className="text-white-50">
              Sign Out
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/register" className="text-white-50">
              Sign Up
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;
