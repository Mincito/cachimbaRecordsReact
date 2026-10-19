import {createContext, useContext, useEffect, useState} from 'react';
import {sampleProducts} from '../data/products';
import {fetchProducts} from '../services/products';
const ProductsContext = createContext(null);

export function ProductsProvider({children}) {
  const [products, setProducts] = useState(sampleProducts);
  const [status, setStatus] = useState('demo');
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    fetchProducts().then(result => {
      if (active && result !== null) {setProducts(result); setStatus('supabase');}
    }).catch(e => {
      if (active) {setError(e.message); setStatus('error');}
    });
    return () => {active = false;};
  }, []);
  return <ProductsContext.Provider value={{products, status, error}}>{children}</ProductsContext.Provider>;
}
export const useProducts = () => useContext(ProductsContext);
