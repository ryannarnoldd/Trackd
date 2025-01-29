import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/"> Trackd </Navbar.Brand>

        <Nav> <Nav.Link as={Link} to={location.pathname === '/' ? '/profile' : '/'}>
          {location.pathname === '/' ? 'My Profile' : 'Home'}
        </Nav.Link> </Nav>
      </Container>
    </Navbar>

  );
};

export default AppNavbar;