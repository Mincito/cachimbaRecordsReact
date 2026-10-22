import {Container, Form, Button, Alert} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {validateContact} from '../utils/validation';
import {supabase, contactsTable} from '../services/supabaseClient';

const initial = {name:'', email:'', message:''};
export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const change = (key, value) => {setForm(f => ({...f, [key]: value})); setStatus('');};

  async function submit(e) {
    e.preventDefault();
    const next = validateContact(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!supabase || !contactsTable) {
      setStatus('No se envió: revisa VITE_SUPABASE_CONTACTS_TABLE en .env.local.');
      return;
    }
    setLoading(true);
    try {
      const {data: auth, error: authError} = await supabase.auth.getUser();
      if (!auth.user) {
        setStatus('Debes iniciar sesión para enviar mensajes de contacto.');
        return;
      }
      if (authError) throw authError;
      const {error} = await supabase.from(contactsTable).insert({
        nombre:form.name.trim(), email:form.email.trim(), mensaje:form.message.trim()
      });
      if (error) throw error;
      setStatus('Mensaje enviado correctamente.');
      setForm(initial);
    } catch (err) {
      setStatus(`No se pudo enviar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return <main><Container className="content-section"><div className="form-panel">
    <h1>Formulario de contacto</h1>
    <p className="small">Debes <Link to="/login">iniciar sesión</Link> para enviar un mensaje.</p>
    <Form onSubmit={submit} noValidate>
      <Form.Group className="mb-3" controlId="contact-name"><Form.Label>Nombre completo</Form.Label>
        <Form.Control value={form.name} maxLength={100} isInvalid={Boolean(errors.name)} placeholder="Ingresa tu nombre completo" onChange={e => change('name', e.target.value)}/>
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback></Form.Group>
      <Form.Group className="mb-3" controlId="contact-email"><Form.Label>Correo</Form.Label>
        <Form.Control type="email" value={form.email} maxLength={254} isInvalid={Boolean(errors.email)} placeholder="ejemplo@correo.com" onChange={e => change('email', e.target.value)}/>
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback></Form.Group>
      <Form.Group className="mb-3" controlId="contact-message"><Form.Label>Contenido</Form.Label>
        <Form.Control as="textarea" rows={5} maxLength={255} value={form.message} isInvalid={Boolean(errors.message)} placeholder="Escribe tu mensaje aquí..." onChange={e => change('message', e.target.value)}/>
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback></Form.Group>
      <Button type="submit" disabled={loading} className="action-button">{loading ? 'Enviando...' : 'Enviar'}</Button>
      {status && <Alert className="mt-3" variant={status.includes('correctamente') ? 'success' : 'warning'} role="status">{status}</Alert>}
    </Form>
  </div></Container></main>;
}
