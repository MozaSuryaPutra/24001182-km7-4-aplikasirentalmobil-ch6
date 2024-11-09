import { Link, useNavigate } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLinkClick = () => {
    setExpanded(false);
  };

  if (user === null) {
    return null;
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{ zIndex: 2 }}
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "bold", color: "#0D28A6", marginLeft: "25px" }}
        >
          Binar Car Rental
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="ms-auto">
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

            <Nav.Link
              as={Link}
              to="/"
              onClick={handleLinkClick}
              className="d-lg-none"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cars/"
              onClick={handleLinkClick}
              className="d-lg-none"
            >
              Cars
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/models/"
              onClick={handleLinkClick}
              className="d-lg-none"
            >
              Models
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/types"
              onClick={handleLinkClick}
              className="d-lg-none"
            >
              Types
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
