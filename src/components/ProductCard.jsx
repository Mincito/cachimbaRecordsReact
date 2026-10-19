import {Link} from 'react-router-dom';
import ProductImage from './ProductImage';
import {moneyCLP} from '../utils/catalog';
export default function ProductCard({product, onAdd}) {
  return <article className="tarjeta-producto h-100">
    <Link to={`/producto/${encodeURIComponent(product.id)}`} className="enlace-tarjeta">
      <ProductImage src={product.image} alt={`Portada de ${product.title}`} />
      <div className="card-data">
        <span className="categoria-tag">{product.genre}</span>
        <h3>{product.title}</h3>
        <p className="precio">{moneyCLP(product.price)}</p>
      </div>
    </Link>
    <button type="button" className="btn-comprar" onClick={() => onAdd(product)}>Agregar al carrito</button>
  </article>;
}
