import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';

import { useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top" data-bs-theme="dark">
      <Container>
          <Navbar.Brand href="#">Studio Ghibli</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Register</Nav.Link>
          </Nav>
            <Col xs="auto">
            <Button variant="outline-light" onClick={logout}>LOGOUT</Button>
            </Col>
      </Container>
    </Navbar>
  );
}

export default Header;