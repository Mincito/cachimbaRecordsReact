export const moneyCLP = (amount) => new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0
}).format(Number(amount) || 0);

export const normalizeSearch = (value) => String(value ?? '')
  .toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

export function searchProducts(products, term = '', genre = '') {
  const q = normalizeSearch(term);
  return products.filter((p) => {
    const text = normalizeSearch(`${p.title} ${p.artist} ${p.genre}`);
    return (!q || text.includes(q)) && (!genre || p.genre === genre);
  });
}

export const genresOf = (products) => [...new Set(products.map(p => p.genre).filter(Boolean))].sort();
