import { createClient } from '@supabase/supabase-js';

const env = import.meta.env || {};
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Sin .env se puede desarrollar toda la interfaz con el catálogo local.
// Nunca colocar aquí la service_role ni secretos de administrador.
export const supabase = url && key ? createClient(url, key) : null;
export const productTable = env.VITE_SUPABASE_PRODUCTS_TABLE || '';
export const contactsTable = env.VITE_SUPABASE_CONTACTS_TABLE || '';
