import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const MainMenu = () => {
  const user = useSelector(getUser);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Navbar.Brand>
        <Link to="/" className="text-white-50">
          Ads App
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link>
            <Link to="/" className="text-white-50">
              Home
            </Link>
          </Nav.Link>
          {!user && (
            <Nav.Link>
              <Link to="/login" className="text-white-50">
                Sign In
              </Link>
            </Nav.Link>
          )}
          {user && (
            <Nav.Link>
              <Link to="/logout" className="text-white-50">
                Sign Out
              </Link>
            </Nav.Link>
          )}
          {!user && (
            <Nav.Link>
              <Link to="/register" className="text-white-50">
                Sign Up
              </Link>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;
