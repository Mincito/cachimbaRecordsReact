import ProductImage from './ProductImage';
import {moneyCLP} from '../utils/catalog';
export default function CartRow({item, onQuantity, onRemove}) {
  return <div className="cart-row">
    <ProductImage src={item.image} alt={`Portada de ${item.title}`} />
    <div className="cart-description"><strong>{item.title}</strong><span>{moneyCLP(item.price)} c/u</span></div>
    <div className="cart-controls">
      <label htmlFor={`qty-${item.id}`}>Cantidad</label>
      <input id={`qty-${item.id}`} className="form-control" type="number" min="1" max="99" value={item.quantity}
        onChange={e => onQuantity(item.id, Math.min(99, Number(e.target.value)))}/>
      <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onRemove(item.id)}>Eliminar</button>
    </div>
  </div>;
}
