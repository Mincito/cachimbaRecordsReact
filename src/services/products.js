import { supabase, productTable } from './supabaseClient';

const parsePrice = (value) => {
  if (typeof value === 'number') return value;
  // CLP: "$50.890" => 50890; adaptarlo con el esquema de la BD si usa centavos.
  return Number(String(value ?? 0).replace(/[^\d]/g, '')) || 0;
};
const imagePath = (value) => {
  const image = String(value || '');
  return image.startsWith('http') || image.startsWith('/') ? image : image ? `/images/${image}` : '';
};

export function mapProduct(row) {
  const title = row.title ?? row.titulo ?? row.nombre ?? '';
  const image = imagePath(row.image ?? row.imagen ?? row.imagen_url ?? row.image_url);
  const genre = row.genre ?? row.genero ?? row.categoria ?? 'Sin categoría';
  return {
    id: String(row.id), title,
    artist: row.artist ?? row.artista ?? String(title).split(' - ')[0],
    genre, price: parsePrice(row.price ?? row.precio), image,
    images: Array.isArray(row.images) ? row.images.map(imagePath) : [image],
    description: row.description ?? row.descripcion ?? '',
    tracks: Array.isArray(row.tracks) ? row.tracks : [],
    featured: row.featured ?? row.destacado ?? false,
    isNew: row.is_new ?? row.nuevo ?? false,
    isOffer: row.is_offer ?? row.oferta ?? false
  };
}

export async function fetchProducts() {
  if (!supabase || !productTable) return null; // Sin conexión configurada.
  const {data, error} = await supabase.from(productTable).select('*');
  if (error) throw error;
  return (data || []).map(mapProduct);
}
