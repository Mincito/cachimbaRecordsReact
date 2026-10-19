import {Row, Col} from 'react-bootstrap';
import ProductCard from './ProductCard';
export default function ProductGrid({products, onAdd}) {
  if (!products.length) return <p className="empty-state">No se encontraron vinilos con esos filtros.</p>;
  return <Row className="g-4">{products.map(p => <Col xs={12} sm={6} md={4} lg={3} xl={3} key={p.id}>
    <ProductCard product={p} onAdd={onAdd} />
  </Col>)}</Row>;
}
