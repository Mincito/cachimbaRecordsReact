import {useEffect, useState} from 'react';
import {Container, Card, Alert, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {supabase} from '../services/supabaseClient';
import {moneyCLP} from '../utils/catalog';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authVersion, setAuthVersion] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    const {data:{subscription}} = supabase.auth.onAuthStateChange(() => {
      setAuthVersion(version => version + 1);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let current = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        if (!supabase) throw new Error('Supabase no está configurado.');
        const {data: auth, error: authError} = await supabase.auth.getUser();
        if (!current) return;
        if (!auth.user) {
          setIsAuthenticated(false);
          setOrders([]);
          return;
        }
        if (authError) throw authError;
        setIsAuthenticated(true);
        const {data, error: queryError} = await supabase.from('orders')
          .select('id,total,status,created_at,order_items(title,quantity,unit_price)')
          .order('created_at', {ascending:false});
        if (queryError) throw queryError;
        if (current) setOrders(data ?? []);
      } catch (err) {
        if (current) setError(err.message || 'No se pudieron cargar los pedidos.');
      } finally {
        if (current) setLoading(false);
      }
    }
    load();
    return () => {current = false;};
  }, [authVersion]);

  return <main><Container className="content-section">
    <h1>Mis pedidos</h1>
    <p className="small">Pedidos de demostración: no se realizan pagos ni despachos reales.</p>
    {loading ? <p><Spinner size="sm" /> Cargando pedidos...</p> :
      error ? <Alert variant="danger" role="alert">{error}</Alert> :
      !isAuthenticated ? <Alert variant="warning">Debes <Link to="/login">iniciar sesión</Link> para ver tus pedidos.</Alert> :
      !orders.length ? <div className="empty-state"><p>Aún no has registrado pedidos.</p><Link to="/productos">Ver vinilos</Link></div> :
      <div className="d-grid gap-3">
        {orders.map(order => <Card key={order.id} className="p-3">
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <div><strong>Pedido #{order.id.slice(0, 8).toUpperCase()}</strong><br />
              <span className="small">{new Date(order.created_at).toLocaleString('es-CL')}</span></div>
            <div><strong>{moneyCLP(order.total)}</strong><br /><span className="small">{order.status}</span></div>
          </div>
          <ul className="mt-3 mb-0">
            {(order.order_items ?? []).map((item, index) => <li key={index}>
              {item.title} — {item.quantity} × {moneyCLP(item.unit_price)}
            </li>)}
          </ul>
        </Card>)}
      </div>
    }
  </Container></main>;
}
