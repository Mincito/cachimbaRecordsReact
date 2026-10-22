import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import Blogs from './pages/Blogs';
import AdminDashboard from './components/AdminDashboard'; // 1. Importas tu panel
import Orders from './pages/Orders';
import {useProducts} from './context/ProductsContext';

export default function App() {
  const {status, error} = useProducts();
  return <div className="app-shell">
    <Header />
    {status === 'error' && <div role="alert" className="alert alert-warning mb-0 text-center">No se pudo cargar Supabase: {error}. Mostrando catálogo local de respaldo.</div>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Catalog />} />
      <Route path="/nuevos" element={<Catalog filter="new" />} />
      <Route path="/ofertas" element={<Catalog filter="offer" />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/pedidos" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      
      {/* 2. Agregas esta ruta para que el navegador sepa a dónde ir */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </div>;
}