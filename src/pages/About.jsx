import {Container, Row, Col} from 'react-bootstrap';
export default function About() {
  return <main><section className="subhero"><Container><span className="section-kicker">NUESTRA HISTORIA</span><h1>Sobre Cachimba Records</h1><p>Música para escuchar, coleccionar y compartir.</p></Container></section>
  <Container className="content-section about-copy">
    <p>Cachimba Records es una tienda online dedicada a la venta de vinilos de distintos artistas y géneros musicales.</p>
    <p>Nuestro objetivo es acercar la música en formato físico a personas que disfrutan coleccionar discos, descubrir nuevos artistas y escuchar sus álbumes favoritos en vinilo.</p>
    <p>En nuestro catálogo buscamos tener variedad musical, incluyendo rock, hip hop, pop, música latina, cumbia y otros géneros.</p>
    <Row className="g-4 my-3"><Col md={6}><div className="info-box"><h2>Nuestra misión</h2><p>Entregar una experiencia sencilla y cómoda para que nuestros clientes puedan encontrar y comprar sus vinilos favoritos desde cualquier lugar.</p></div></Col>
      <Col md={6}><div className="info-box"><h2>Nuestra visión</h2><p>Convertir a Cachimba Records en una tienda reconocida por su variedad musical y por ofrecer una experiencia cercana a los fanáticos y coleccionistas de música.</p></div></Col></Row>
    <h2>Nuestro equipo</h2><p>Este proyecto fue desarrollado por estudiantes de Analista Programador de Duoc UC.</p>
    <Row className="g-4"><Col md={6}><div className="info-box"><h3>Benjamín Orellana</h3><p>Desarrollo de funcionalidades, validaciones, contenido y estructura.</p></div></Col>
      <Col md={6}><div className="info-box"><h3>Benjamín Céspedes</h3><p>Desarrollo de funcionalidades, productos, estructura y contenido.</p></div></Col></Row>
  </Container></main>;
}
