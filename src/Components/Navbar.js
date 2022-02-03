import { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext, useAuth } from "../Services/context";
import { getToken } from "../Services/auth";

const NavbarApp = () => {
  const { setCurrentUser } = useAuth();
  const context = useContext(AuthContext);
  const [token, setToken] = useState();

  useEffect(() => {
      setToken(getToken());
  }, [token, context]);

  const setLogout = () => {
    setCurrentUser();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">IClass</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Módulos</Nav.Link>
            {token ? (
              <>
                <Nav.Link href="/aulas/dashboard">Aulas Dashboard</Nav.Link>

                <Nav.Link href="/modulos/dashboard">Módulos Dashboard</Nav.Link>
              </>
            ) : null}
          </Nav>
          <Nav>
            {token ? (
              <Button
                href="/login"
                variant="outline-light"
                size="md"
                onClick={() => {
                  setLogout();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button variant="dark" size="md" href="/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
