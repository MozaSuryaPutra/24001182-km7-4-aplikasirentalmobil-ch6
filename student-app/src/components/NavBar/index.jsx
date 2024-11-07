import { Link, useNavigate } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react"; // Add useState
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../services/auth";
import NavDropdown from "react-bootstrap/NavDropdown"; // Import NavDropdown

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to control the collapse
  const [expanded, setExpanded] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      const result = await profile(token);
      if (result.success) {
        dispatch(setUser(result.data));
        return;
      }

      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate({ to: "/login" });
    };

    if (token) {
      getProfile(token);
    }
  }, [dispatch, navigate, token]);

  const logout = (event) => {
    event.preventDefault();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/login" });
  };

  // Handle link clicks to close the collapse
  const handleLinkClick = () => {
    setExpanded(false); // Close the navbar collapse
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{ zIndex: 2 }}
      expanded={expanded} // Set the expanded state
      onToggle={(expanded) => setExpanded(expanded)} // Set the state when toggled
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "bold", color: "#0D28A6" }}
        >
          Binar Car Rental
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleLinkClick}>
                  <Image
                    src={user?.profile_picture}
                    fluid
                    style={{
                      width: "30px",
                      height: "30px",
                      display: "inline-block",
                      overflow: "hidden",
                      borderRadius: "50%",
                      marginRight: "3px",
                    }}
                  />{" "}
                  {user?.name}
                </Nav.Link>
                <Nav.Link
                  onClick={(event) => {
                    handleLinkClick(event);
                    logout(event);
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={handleLinkClick}>
                  Register
                </Nav.Link>
              </>
            )}

            {/* Mobile Menu Dropdowns */}
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLinkClick}
              className="d-lg-none"
            >
              Dashboard
            </Nav.Link>
            <NavDropdown title="Cars" id="cars-dropdown" className="d-lg-none">
              <NavDropdown.Item
                as={Link}
                to="/cars/list"
                onClick={handleLinkClick}
              >
                List Cars
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/cars/add"
                onClick={handleLinkClick}
              >
                Add New Car
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Models"
              id="models-dropdown"
              className="d-lg-none"
            >
              <NavDropdown.Item
                as={Link}
                to="/models/list"
                onClick={handleLinkClick}
              >
                List Models
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/models/add"
                onClick={handleLinkClick}
              >
                Add New Model
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Types"
              id="types-dropdown"
              className="d-lg-none"
            >
              <NavDropdown.Item
                as={Link}
                to="/types/list"
                onClick={handleLinkClick}
              >
                List Types
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/types/add"
                onClick={handleLinkClick}
              >
                Add New Type
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
