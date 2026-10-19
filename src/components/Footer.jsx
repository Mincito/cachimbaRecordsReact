import {Container} from 'react-bootstrap';
export default function Footer() {
  return <footer className="site-footer"><Container className="footer-inside">
    <div><strong>CACHIMBA RECORDS</strong><p>Música para escuchar, coleccionar y compartir.</p></div>
    <div><ProductPaymentLogo/><p>© 2026 CachimbaRecords · Todos los derechos reservados.</p></div>
  </Container></footer>;
}
function ProductPaymentLogo() {return <img src="/images/Pagos_metodos.png" alt="Métodos de pago" className="payment-methods" onError={e => {e.currentTarget.style.display = 'none';}}/>;}
