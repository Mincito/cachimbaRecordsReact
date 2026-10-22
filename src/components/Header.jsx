import {useEffect, useState} from 'react';
import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {useCart} from '../context/CartContext';
import {supabase} from '../services/supabaseClient';

export default function Header() {

  const {count} = useCart();

  // Usuario conectado
  const [user, setUser] = useState(null);

  // Esperar a que Supabase compruebe la sesión
  const [checkingSession, setCheckingSession] = useState(Boolean(supabase));

  // Control del cierre de sesión
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  // Detectar cuando un usuario inicia o cierra sesión
  useEffect(() => {

    if (!supabase) return;

    const {data: {subscription}} = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setUser(session?.user ?? null);
        setCheckingSession(false);

      }
    );

    return () => {
      subscription.unsubscribe();
    };

  }, []);

  // Cerrar sesión
  async function handleLogout() {

    if (!supabase) return;

    setLogoutError('');
    setLoggingOut(true);

    try {

      const {error} = await supabase.auth.signOut();

      if (error) throw error;

    } catch (error) {

      setLogoutError(error.message || 'No se pudo cerrar sesión.');

    } finally {

      setLoggingOut(false);

    }

  }

  return (
    <>

      <div className="delivery-banner">
        🚚 Envío gratis en compras sobre $90.000
      </div>

      <Navbar
        expand="lg"
        className="site-navbar"
        data-bs-theme="dark"
      >

        <Container>

          <Navbar.Brand
            as={Link}
            to="/"
            className="brand"
          >
            CACHIMBA <span>RECORDS</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="cachimba-nav" />

          <Navbar.Collapse id="cachimba-nav">

            <Nav className="ms-auto align-items-lg-center gap-lg-2">

              <Nav.Link as={NavLink} end to="/">
                Home
              </Nav.Link>

              <NavDropdown title="Vinilos" id="vinyl-dropdown">

                <NavDropdown.Item as={Link} to="/productos">
                  Todos los vinilos
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/nuevos">
                  Nuevos
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/ofertas">
                  Ofertas
                </NavDropdown.Item>

              </NavDropdown>

              <Nav.Link as={NavLink} to="/nosotros">
                Nosotros
              </Nav.Link>

              <Nav.Link as={NavLink} to="/blogs">
                Blogs
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contacto">
                Contacto
              </Nav.Link>

              {/* Opciones según el estado de sesión */}

              {!checkingSession && (

                user ? (

                  <>

                    {/* Usuario conectado */}

                    <span className="navbar-text text-light small text-break">
                      👤 {user.email}
                    </span>

                    {/* Cerrar sesión */}

                    <Nav.Link
                      as="button"
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="bg-transparent border-0"
                    >
                      {loggingOut ? 'Cerrando...' : 'Cerrar sesión'}
                    </Nav.Link>

                  </>

                ) : (

                  <>

                    {/* Usuario no conectado */}

                    <Nav.Link as={NavLink} to="/login">
                      Ingresar
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/registro">
                      Registro
                    </Nav.Link>

                  </>

                )

              )}

              {/* Carrito */}

              <Nav.Link
                as={NavLink}
                to="/carrito"
                aria-label={`Carrito: ${count} artículos`}
              >
                🛒{' '}
                <Badge bg="light" text="dark">
                  {count}
                </Badge>
              </Nav.Link>

            </Nav>

          </Navbar.Collapse>

        </Container>

      </Navbar>

      {logoutError && (
        <div className="alert alert-danger mb-0 text-center" role="alert">
          {logoutError}
        </div>
      )}

    </>
  );
}