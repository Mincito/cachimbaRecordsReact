import {useParams, Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useProducts} from '../context/ProductsContext';
import {useCart} from '../context/CartContext';
import {moneyCLP} from '../utils/catalog';
import ProductImage from '../components/ProductImage';
export default function ProductDetail() {
  const {id} = useParams();
  const {products} = useProducts();
  const {add} = useCart();
  const product = products.find(p => String(p.id) === id);
  const [chosen, setChosen] = useState('');
  useEffect(() => setChosen(product?.image || ''), [product?.id, product?.image]);
  if (!product) return <Container className="content-section"><h1>Vinilo no encontrado</h1><Link to="/productos">Volver al catálogo</Link></Container>;
  const images = [...new Set((product.images || [product.image]).filter(Boolean))];
  return <main><Container className="content-section">
    <p className="breadcrumbs"><Link to="/productos">Vinilos</Link> / {product.title}</p>
    <Row className="detail-panel g-4"><Col md={6}>
      <ProductImage src={chosen || product.image} alt={`Portada de ${product.title}`} className="detail-image" />
      {images.length > 1 && <div className="thumbs">{images.map(path => <button key={path} type="button" className={`thumb ${path === chosen ? 'selected' : ''}`} aria-label={`Ver imagen ${images.indexOf(path) + 1}`} onClick={() => setChosen(path)}><ProductImage src={path} alt=""/></button>)}</div>}
    </Col><Col md={6}>
      <span className="section-kicker">{product.genre}</span><h1 className="detail-title">{product.title}</h1>
      <p className="detail-price">{moneyCLP(product.price)}</p>
      {product.description && <p>{product.description}</p>}
      <p><strong>Artista:</strong> {product.artist}</p>
      <Button className="action-button" onClick={() => add(product)}>Agregar al carrito 🛒</Button>
      {product.tracks?.length > 0 && <section className="track-list"><h2>Lista de canciones</h2><ol>{product.tracks.map((track, index) => <li key={`${index}-${track}`}>{track}</li>)}</ol></section>}
    </Col></Row>
  </Container></main>;
}
