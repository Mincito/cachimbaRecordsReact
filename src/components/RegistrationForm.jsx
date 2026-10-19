import {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {validateRegistration} from '../utils/validation';
import {supabase} from '../services/supabaseClient';
import {Link} from 'react-router-dom';
export default function RegistrationForm() {
  const [form, setForm] = useState({email:'', password:'', confirm:''});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const change = (key, val) => {setForm(f => ({...f, [key]:val})); setMessage('');};
  async function submit(e) {
    e.preventDefault(); setMessage('');
    const next = validateRegistration(form); setErrors(next);
    if (Object.keys(next).length) return;
    if (!supabase) {setMessage('Registro válido, pero falta configurar Supabase. No se creó ninguna cuenta.'); return;}
    setPending(true);
    try {const {error} = await supabase.auth.signUp({email: form.email.trim(), password: form.password});
      if (error) throw error;
      setMessage('Registro solicitado. Revisa tu correo si está activada la confirmación por email.');
    } catch(err) {setMessage(err.message);} finally {setPending(false);}
  }
  return <Form onSubmit={submit} noValidate>
    <Form.Group className="mb-3" controlId="register-email"><Form.Label>Correo electrónico</Form.Label>
      <Form.Control type="email" value={form.email} isInvalid={Boolean(errors.email)} onChange={e=>change('email',e.target.value)}/>
      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback></Form.Group>
    <Form.Group className="mb-3" controlId="register-password"><Form.Label>Contraseña</Form.Label>
      <Form.Control type="password" value={form.password} isInvalid={Boolean(errors.password)} onChange={e=>change('password',e.target.value)}/>
      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback></Form.Group>
    <Form.Group className="mb-3" controlId="register-confirm"><Form.Label>Confirmar contraseña</Form.Label>
      <Form.Control type="password" value={form.confirm} isInvalid={Boolean(errors.confirm)} onChange={e=>change('confirm',e.target.value)}/>
      <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback></Form.Group>
    <Button type="submit" disabled={pending} className="action-button">Registrarse</Button>
    <p className="mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    {message && <Alert variant="info" className="mt-3" role="status">{message}</Alert>}
  </Form>;
}
