// Catálogo inicial transcrito de los productos publicados en
// github.com/BenjitaDEV/TiendaOnlineBasico-Eva-1 (index.html y productos.html).
// No sustituye la BD. Se usa solo hasta conocer la estructura real de Supabase.
const record = (id, title, artist, genre, price, imageFile, options = {}) => ({
  id, title, artist, genre, price,
  image: `/images/${imageFile}`,
  imageFile,
  images: [imageFile, ...(options.images || [])].map((name) => `/images/${name}`),
  description: options.description || '',
  tracks: options.tracks || [],
  featured: Boolean(options.featured),
  // El repositorio no identifica confiablemente ofertas/novedades, no inventamos descuentos.
  isNew: false,
  isOffer: false
});

export const sampleProducts = [
  record('2pac-all-eyez-on-me', '2Pac - All Eyez On Me', '2Pac', 'Hip Hop', 124990,
    '2pac - all eyez on me 500x500.jpg', {featured: true,
      images: ['All-eyez-on-me-BACK.jpg', 'All-eyez-on-me-VINIL.jpg'],
      description: 'Edición en vinilo de 4 LP. Sello: Death Row.',
      tracks: ['Ambitionz Az a Ridah', 'All About U', 'Skandalouz', 'California Love [Remix]', 'All Eyez on Me'] }),
  record('prisioneros-voz-80', "Los Prisioneros - La voz de los '80", 'Los Prisioneros', 'Rock Latino', 50890,
    'los-prisioneros-la-voz-de-los-80.jpg', {featured: true,
      images: ['la-voz-de-los-80-back.jpg', 'la-voz-de-los-80-VINIL.jpg'],
      description: 'Sello: Fusión.',
      tracks: ["La Voz De Los '80", 'Brigada De Negro', 'Latinoamérica Es Un Pueblo Al Sur De Estados Unidos', 'Paramar', 'Nunca Quedas Mal Con Nadie'] }),
  record('cerati-bocanada', 'Gustavo Cerati - Bocanada', 'Gustavo Cerati', 'Rock Latino', 59990,
    'Bocanada-Cerati.jpg', {featured: true,
      images: ['Bocanada-back.jpg', 'bocanada-VINIL.jpg.jpg'],
      description: 'Sello: Sony Music.',
      tracks: ['Tabú', 'Engaña', 'Bocanada', 'Puente', 'Río Babel', 'Beautiful', 'Verbo Carne', 'Alma', 'Balsa'] }),
  record('tiro-de-gracia-exitos', 'Tiro de gracia - GRANDES EXITOS', 'Tiro de Gracia', 'Hip Hop', 34493,
    'tiro-de-gracia-grandes-exitos.jpg', {featured: true,
      images: ['tiro-de-gracia-grandes-exitos-BACK.jpg', 'tiro-de-gracia-grandes-exitos-VINIL.jpg'],
      description: 'Sello: Universal Music Chile.',
      tracks: ['Juego Verdadero', 'Eso de ser Papá', 'Chupacabras', 'Sueños', 'Ser humano', 'Viaje sin rumbo'] }),
  record('molotov-donde-jugaran', 'Molotov - ¿Donde jugarán las niñas?', 'Molotov', 'Rock Alternativo', 190990,
    'Molotov–Donde-Jugaran-Las-Ninas.jpg', {featured: true,
      images: ['Molotov–Donde-Jugaran-Las-Ninas-BACK.jpg', 'vinil-molotov-donde-jugaran-las-niñas.jpg'],
      description: 'Edición 20 años. Sello: Universal Music.',
      tracks: ['Voto Latino', 'Gimme Tha Power', 'Mátate Teté'] }),
  record('fuerza-regida-111xpantia', 'Fuerza Regida - 111XPANTIA', 'Fuerza Regida', 'Regional Mexicano', 44990,
    '11xpantia.jpg', {tracks: ['GodFather', 'ayy weyy', 'Nocturno', 'peliculiando', 'ANSIEDAD', 'CHAKA'] }),
  record('chico-trujillo-plato', 'Chico Trujillo - Plato Único Bailable', 'Chico Trujillo', 'Cumbia', 39990,
    'ct-pub.jpg', {tracks: ['Varga-Varga', 'Lanzaplatos', 'Loca', 'Los Sabanales', 'Dolor', 'Sin Excusas'] }),
  record('michael-jackson-thriller', 'Michael Jackson - Thriller', 'Michael Jackson', 'Pop', 45990,
    'MICHAEL-JACKSON-thriller.jpg', { images: ['michael-jackson-thriller-lp-b.jpg','Thirller-Vinil.jpg'],
      tracks: ["Wanna Be Startin' Somethin'", 'Baby Be Mine', 'Thriller', 'Beat It', 'Billie Jean', 'Human Nature'] }),
  record('radiohead-ok-computer', 'Radiohead - OK Computer', 'Radiohead', 'Rock Alternativo', 49990,
    'okcomputer.jpg', {tracks: ['Airbag', 'Paranoid Android', 'Exit Music (For a Film)', 'Let Down', 'Karma Police', 'No Surprises', 'Lucky'] }),
  record('bunkers-velocidad-luz', 'Los Bunkers - La velocidad de la luz', 'Los Bunkers', 'Rock', 41243,
    'la-velocidad-de-la-luz.jpg', {images: ['bunkers-la-velocidad-de-la-luz-BACK.jpg', 'bunkers-vinilo-velocidad-de-la-luz.jpg'],
      tracks: ['Desperdiciame', 'Estando Solo', 'Sur', 'No!', 'Dicen', 'La Velocidad De La Luz'] })
];
