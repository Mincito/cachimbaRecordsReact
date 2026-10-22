import {useState} from 'react';
import {Container, Row, Col, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CartRow from '../components/CartRow';
import {useCart} from '../context/CartContext';
import {moneyCLP} from '../utils/catalog';
import {supabase} from '../services/supabaseClient';

export default function Cart() {
  const {items, total, count, setQuantity, remove, clear} = useCart();
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);

  async function registerDemoOrder() {
    setNotice(null);
    if (!supabase) {
      setNotice({type:'danger', text:'Falta configurar Supabase.'});
      return;
    }
    setSending(true);
    try {
      const {data: auth, error: authError} = await supabase.auth.getUser();
      if (!auth.user) {
        setNotice({type:'warning', text:'Debes iniciar sesión para registrar un pedido.'});
        return;
      }
      if (authError) throw authError;
      const p_items = items.map(item => ({id:String(item.id), quantity:Number(item.quantity)}));
      const {data: orderId, error} = await supabase.rpc('create_demo_order', {p_items});
      if (error) throw error;
      clear();
      setNotice({type:'success', text:`Pedido de demostración registrado (#${orderId}). No se efectuó ningún pago.`});
    } catch (error) {
      setNotice({type:'danger', text:`No se pudo registrar el pedido: ${error.message}`});
    } finally {
      setSending(false);
    }
  }

  return <main><Container className="content-section">
    <h1>Mi carrito</h1>
    <p>{count} vinilo(s) seleccionado(s)</p>
    {notice && <Alert role="status" variant={notice.type}>
      {notice.text}{notice.type === 'warning' && <> <Link to="/login">Ingresar</Link></>}
      {notice.type === 'success' && <> <Link to="/pedidos">Ver mis pedidos</Link></>}
    </Alert>}
    {!items.length ? <div className="empty-state">
      <p>Tu carrito está vacío.</p>
      <Link className="btn action-button" to="/productos">Ver vinilos</Link>
      {' '}<Link className="btn btn-outline-secondary" to="/pedidos">Mis pedidos</Link>
    </div> :
      <Row className="g-4">
        <Col lg={8}>
          {items.map(item => <CartRow key={item.id} item={item}
            onQuantity={setQuantity} onRemove={remove} />)}
        </Col>
        <Col lg={4}><aside className="order-summary">
          <h2>Resumen de compra</h2>
          <div className="d-flex justify-content-between"><span>Subtotal</span><strong>{moneyCLP(total)}</strong></div>
          <p className="mt-3 small">El envío se calcula fuera de esta demostración.</p>
          <div className="d-flex justify-content-between fw-bold"><span>Total productos (estimado)</span><span>{moneyCLP(total)}</span></div>
          <p className="small mt-3">Solo se registrará un <strong>pedido de demostración</strong>. No hay pasarela de pago ni cobro.</p>
          <Button className="w-100 action-button" onClick={registerDemoOrder} disabled={sending}>
            {sending ? 'Registrando...' : 'Registrar pedido (sin pago)'}
          </Button>
          <Button variant="link" className="w-100 mt-2" onClick={clear} disabled={sending}>Vaciar carrito</Button>
          <Link className="d-block text-center mt-2" to="/pedidos">Ver mis pedidos</Link>
        </aside></Col>
      </Row>}
  </Container></main>;
}
