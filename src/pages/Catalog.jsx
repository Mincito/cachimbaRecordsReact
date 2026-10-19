import {Container, Form, Row, Col} from 'react-bootstrap';
import {useSearchParams} from 'react-router-dom';
import {useMemo, useState} from 'react';
import ProductGrid from '../components/ProductGrid';
import {useCart} from '../context/CartContext';
import {useProducts} from '../context/ProductsContext';
import {genresOf, searchProducts} from '../utils/catalog';
export default function Catalog({filter = ''}) {
  const {products, status} = useProducts();
  const {add} = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [genre, setGenre] = useState('');
  const base = useMemo(() => filter === 'new' ? products.filter(p => p.isNew) :
    filter === 'offer' ? products.filter(p => p.isOffer) : products, [filter, products]);
  const displayed = searchProducts(base, query, genre);
  const title = filter === 'new' ? 'Vinilos nuevos' : filter === 'offer' ? 'Vinilos en oferta' : 'Vinilos';
  return <main><Container className="content-section">
    <div className="section-heading"><div><span className="section-kicker">EXPLORA NUESTRO CATÁLOGO</span><h1>{title}</h1></div>
      <span className="results-count">{displayed.length} resultados</span></div>
    {filter && status !== 'supabase' && <div className="alert alert-info" role="status">Todavía no se han definido qué productos son {filter === 'new' ? 'nuevos' : 'ofertas'} en los datos de ejemplo. Se habilitarán al recibir esos campos desde la BD.</div>}
    <Row className="g-3 mb-4"><Col md={8}><Form.Label htmlFor="search-vinyl">Buscar vinilo</Form.Label>
      <Form.Control id="search-vinyl" value={query} onChange={e => setSearchParams(e.target.value ? {q: e.target.value} : {})} placeholder="Artista, álbum o género..." /></Col>
      <Col md={4}><Form.Label htmlFor="filter-genre">Género</Form.Label><Form.Select id="filter-genre" value={genre} onChange={e => setGenre(e.target.value)}>
        <option value="">Todos los géneros</option>{genresOf(base).map(g => <option key={g} value={g}>{g}</option>)}
      </Form.Select></Col></Row>
    <ProductGrid products={displayed} onAdd={add}/>
  </Container></main>;
}
