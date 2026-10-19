import {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {supabase} from '../services/supabaseClient';
import {Link} from 'react-router-dom';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(e) {
    e.preventDefault(); setMessage('');
    if (!supabase) {setMessage('Debes configurar Supabase en .env para iniciar sesión.'); return;}
    setPending(true);
    try { const {error} = await supabase.auth.signInWithPassword({email, password});
      if (error) throw error;
      setMessage('Sesión iniciada correctamente.');
    } catch(err) {setMessage(err.message);} finally {setPending(false);}
  }
  return <Form onSubmit={submit}><Form.Group controlId="login-email" className="mb-3"><Form.Label>Correo electrónico</Form.Label>
    <Form.Control required type="email" value={email} onChange={e => setEmail(e.target.value)} /></Form.Group>
    <Form.Group controlId="login-password" className="mb-3"><Form.Label>Contraseña</Form.Label>
    <Form.Control required type="password" value={password} onChange={e => setPassword(e.target.value)} /></Form.Group>
    <Button disabled={pending} type="submit" className="action-button">Iniciar sesión</Button>
    <p className="mt-3 mb-0">¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
    {message && <Alert variant="info" className="mt-3" role="status">{message}</Alert>}</Form>;
}
