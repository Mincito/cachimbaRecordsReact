import { useEffect, useState } from 'react';
import { Container, Table, Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  id: '',
  title: '',
  artist: '',
  genre: '',
  price: '',
  image: '',
  images: '',
  description: '',
  tracks: '',
  featured: false,
  is_new: false,
  is_offer: false,
};

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. Obtener lista de productos desde Supabase
  async function fetchProducts() {
    if (!supabase) return;
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      setMessage('Error al cargar productos: ' + error.message);
    } else {
      setProducts(data || []);
    }
  }

  // 2. Cerrar sesión
  async function handleLogout() {
    if (supabase) {
      await supabase.auth.signOut();
      navigate('/login');
    }
  }

  // 3. Preparar el formulario para editar un producto
  function handleEdit(product) {
    setEditingId(product.id);
    setFormData({
      ...product,
      images: Array.isArray(product.images) ? product.images.join(', ') : '',
      tracks: Array.isArray(product.tracks) ? product.tracks.join(', ') : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFormData(initialForm);
  }

  // 4. Eliminar producto
  async function handleDelete(id) {
    if (!window.confirm('¿Deseas eliminar este vinilo permanentemente?')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      setMessage('Error al eliminar: ' + error.message);
    } else {
      setMessage('Producto eliminado correctamente.');
      fetchProducts();
    }
  }

  // 5. Crear o Editar producto (Submit)
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setPending(true);

    const payload = {
      id: formData.id,
      title: formData.title,
      artist: formData.artist,
      genre: formData.genre,
      price: Number(formData.price),
      image: formData.image,
      images: formData.images ? formData.images.split(',').map((img) => img.trim()) : [],
      description: formData.description,
      tracks: formData.tracks ? formData.tracks.split(',').map((t) => t.trim()) : [],
      featured: formData.featured,
      is_new: formData.is_new,
      is_offer: formData.is_offer,
    };

    if (editingId) {
      // Actualizar
      const { error } = await supabase.from('products').update(payload).eq('id', editingId);
      if (error) {
        setMessage('Error al actualizar: ' + error.message);
      } else {
        setMessage('Producto actualizado con éxito.');
        handleCancelEdit();
        fetchProducts();
      }
    } else {
      // Crear nuevo
      const { error } = await supabase.from('products').insert([payload]);
      if (error) {
        setMessage('Error al crear producto: ' + error.message);
      } else {
        setMessage('Producto agregado exitosamente.');
        setFormData(initialForm);
        fetchProducts();
      }
    }
    setPending(false);
  }

  return (
    <Container className="content-section py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2>Panel de Administración</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>

      {message && (
        <Alert variant="info" className="mb-4" dismissible onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      {/* Formulario Crear / Editar */}
      <Card className="mb-5 shadow-sm">
        <Card.Header as="h5">
          {editingId ? `Editando Vinilo (${editingId})` : 'Agregar Nuevo Vinilo'}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group controlId="prod-id">
                  <Form.Label>ID único</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ej: 2pac-all-eyez-on-me"
                    disabled={!!editingId}
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="prod-title">
                  <Form.Label>Título del disco</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="prod-artist">
                  <Form.Label>Artista</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="prod-genre">
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="prod-price">
                  <Form.Label>Precio ($)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="prod-image">
                  <Form.Label>Imagen principal</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ej: /images/2pac.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="prod-images">
                  <Form.Label>Imágenes adicionales (separadas por comas)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ej: /images/2pac-1.jpg, /images/2pac-2.jpg"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="prod-desc">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="prod-tracks">
                  <Form.Label>Canciones / Tracks (separadas por comas)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="ej: Track 1, Track 2, Track 3"
                    value={formData.tracks}
                    onChange={(e) => setFormData({ ...formData, tracks: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="d-flex gap-4">
                <Form.Check
                  type="checkbox"
                  id="prod-featured"
                  label="Destacado"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  id="prod-isnew"
                  label="Es Nuevo"
                  checked={formData.is_new}
                  onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                />
                <Form.Check
                  type="checkbox"
                  id="prod-isoffer"
                  label="En Oferta"
                  checked={formData.is_offer}
                  onChange={(e) => setFormData({ ...formData, is_offer: e.target.checked })}
                />
              </Col>

              <Col md={12} className="d-flex gap-2">
                <Button disabled={pending} type="submit" className="action-button">
                  {editingId ? 'Guardar Cambios' : 'Agregar Vinilo'}
                </Button>
                {editingId && (
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Cancelar Edición
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Tabla de Productos */}
      <h3 className="mb-3">Lista de Productos ({products.length})</h3>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Artista</th>
            <th>Género</th>
            <th>Precio</th>
            <th>Etiquetas</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.title}</td>
              <td>{prod.artist}</td>
              <td>{prod.genre}</td>
              <td>${Number(prod.price).toLocaleString()}</td>
              <td>
                {prod.featured && <Badge bg="warning" className="me-1 text-dark">Destacado</Badge>}
                {prod.is_new && <Badge bg="success" className="me-1">Nuevo</Badge>}
                {prod.is_offer && <Badge bg="danger">Oferta</Badge>}
              </td>
              <td className="text-center">
                <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEdit(prod)}>
                  Editar
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(prod.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-3">
                No hay productos en la base de datos.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}