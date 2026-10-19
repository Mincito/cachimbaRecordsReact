import {Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import ProductGrid from '../components/ProductGrid';
import {useProducts} from '../context/ProductsContext';
import {useCart} from '../context/CartContext';
export default function Home() {
  const {products} = useProducts();
  const {add} = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const highlights = products.filter(p => p.featured).slice(0, 5);
  const shown = highlights.length ? highlights : products.slice(0, 5);
  return <main>
    <section className="hero-wrapper">
      <div className="hero-background" />
      <div className="hero-content container">
        <span className="hero-eyebrow">TU TIENDA DE VINILOS</span>
        <h1>¡Música para regalar!</h1>
        <p>Encuentra tus vinilos favoritos con envío a todo el país.</p>
        <form className="hero-search" role="search" onSubmit={e => {e.preventDefault(); navigate(`/productos?q=${encodeURIComponent(query.trim())}`);}}>
          <label className="visually-hidden" htmlFor="home-search">Buscar vinilo</label>
          <input id="home-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar producto..." />
          <button type="submit" aria-label="Buscar">🔍</button>
        </form>
      </div>
    </section>
    <Container className="content-section">
      <div className="section-heading"><div><span className="section-kicker">NUESTRA SELECCIÓN</span><h2>Productos destacados</h2></div>
        <Link className="view-all" to="/productos">Ver todos los vinilos →</Link></div>
      <ProductGrid products={shown} onAdd={add}/>
    </Container>
  </main>;
}
