import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top" data-bs-theme="dark">
    <Container>
        <Navbar.Brand href="#">Studio Ghibli API</Navbar.Brand>
    </Container>
    </Navbar>
  );
}

export default Header;