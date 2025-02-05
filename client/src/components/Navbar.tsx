import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"> Trackd </Navbar.Brand>

        <Nav> 

        {/* If path is /signup or /login, show only two buttons Signup and Login.
          If the path is /profile, show only one button Home.
          And if the path is /, show only one button My Profile.
        */}
        
        {location.pathname === '/signup' || location.pathname === '/login' ? (
          <>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </>
        ) : location.pathname === '/profile' ? (
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
        )}

        </Nav>
      </Container>
    </Navbar>

  );
};

export default AppNavbar;