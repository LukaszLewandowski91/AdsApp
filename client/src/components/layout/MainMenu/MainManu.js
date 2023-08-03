import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainMenu = () => {
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
