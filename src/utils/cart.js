export const cartCount = (cart) => cart.reduce((sum, item) => sum + item.quantity, 0);
export const cartTotal = (cart) => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export function addItem(cart, product) {
  const found = cart.find(item => item.id === product.id);
  if (found) return cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
  return [...cart, {id: product.id, title: product.title, price: Number(product.price), image: product.image, quantity: 1}];
}
export const removeItem = (cart, id) => cart.filter(item => item.id !== id);
export function updateQuantity(cart, id, quantity) {
  const next = Number(quantity);
  if (!Number.isInteger(next) || next < 1) return removeItem(cart, id);
  return cart.map(item => item.id === id ? {...item, quantity: next} : item);
}
