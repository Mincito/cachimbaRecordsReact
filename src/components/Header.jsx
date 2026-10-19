import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {useCart} from '../context/CartContext';
export default function Header() {
  const {count} = useCart();
  return <>
    <div className="delivery-banner">🚚 Envío gratis en compras sobre $90.000</div>
    <Navbar expand="lg" className="site-navbar" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">CACHIMBA <span>RECORDS</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="cachimba-nav" />
        <Navbar.Collapse id="cachimba-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={NavLink} end to="/">Home</Nav.Link>
            <NavDropdown title="Vinilos" id="vinyl-dropdown">
              <NavDropdown.Item as={Link} to="/productos">Todos los vinilos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/nuevos">Nuevos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/ofertas">Ofertas</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Ingresar</Nav.Link>
            <Nav.Link as={NavLink} to="/registro">Registro</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" aria-label={`Carrito: ${count} artículos`}>🛒 <Badge bg="light" text="dark">{count}</Badge></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}
