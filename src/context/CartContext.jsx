import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {addItem, removeItem, updateQuantity, cartCount, cartTotal} from '../utils/cart';

const CartContext = createContext(null);
const KEY = 'cachimba-react-carrito';
const readCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(x => x && x.id != null && Number.isFinite(x.price) && Number.isInteger(x.quantity) && x.quantity > 0);
  } catch { return []; }
};

export function CartProvider({children}) {
  const [items, setItems] = useState(readCart);
  useEffect(() => {try {localStorage.setItem(KEY, JSON.stringify(items));} catch { /* navegador privado */ }}, [items]);
  const value = useMemo(() => ({
    items, count: cartCount(items), total: cartTotal(items),
    add: (product) => setItems(c => addItem(c, product)),
    remove: (id) => setItems(c => removeItem(c, id)),
    setQuantity: (id, qty) => setItems(c => updateQuantity(c, id, qty)),
    clear: () => setItems([])
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart requiere CartProvider');
  return context;
}
