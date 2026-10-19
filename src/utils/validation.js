const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateContact({name = '', email = '', message = ''}) {
  const errors = {};
  if (name.trim().length < 2 || name.length > 100) errors.name = 'Escribe un nombre válido (2 a 100 caracteres).';
  if (!mail.test(email.trim())) errors.email = 'Ingresa un correo válido.';
  if (message.trim().length < 10 || message.length > 255) errors.message = 'El mensaje debe tener entre 10 y 255 caracteres.';
  return errors;
}
export function validateRegistration({email = '', password = '', confirm = ''}) {
  const errors = {};
  if (!mail.test(email.trim())) errors.email = 'Ingresa un correo válido.';
  if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  if (password !== confirm) errors.confirm = 'Las contraseñas no coinciden.';
  return errors;
}
