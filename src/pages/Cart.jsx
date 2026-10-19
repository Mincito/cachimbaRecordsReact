import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CartRow from '../components/CartRow';
import {useCart} from '../context/CartContext';
import {moneyCLP} from '../utils/catalog';
export default function Cart() {
  const {items, total, count, setQuantity, remove, clear} = useCart();
  return <main><Container className="content-section">
    <h1>Mi carrito</h1><p>{count} vinilo(s) seleccionado(s)</p>
    {!items.length ? <div className="empty-state"><p>Tu carrito está vacío.</p><Link className="btn action-button" to="/productos">Ver vinilos</Link></div> :
      <Row className="g-4"><Col lg={8}>{items.map(item => <CartRow key={item.id} item={item} onQuantity={setQuantity} onRemove={remove}/>)}</Col>
      <Col lg={4}><aside className="order-summary"><h2>Resumen de compra</h2><div className="d-flex justify-content-between"><span>Subtotal</span><strong>{moneyCLP(total)}</strong></div>
        <p className="mt-3 small">Envío gratis desde $90.000. El costo final debe calcularse en el checkout real.</p>
        <div className="d-flex justify-content-between fw-bold"><span>Total productos</span><span>{moneyCLP(total)}</span></div>
        <p className="small text-muted mt-3">El pago aún no está integrado. No se realizará ningún cargo.</p>
        <Button disabled className="w-100 action-button">Finalizar compra (pendiente)</Button>
        <Button variant="link" className="w-100 mt-2" onClick={clear}>Vaciar carrito</Button></aside></Col></Row>}
  </Container></main>;
}
