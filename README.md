# Cachimba Records — migración a React (primera versión)

Migración del frontend de **Cachimba Records** (repositorio fuente:
https://github.com/BenjitaDEV/TiendaOnlineBasico-Eva-1) para DSY1104, Evaluación Parcial 2.

El proyecto original es HTML/CSS/JS. Esta versión separa la interfaz en React con
**Vite, React Router y React Bootstrap**, usando **props, useState, Context y formularios controlados**.
La fuente original sigue intacta: esta carpeta es una versión independiente que se
puede subir a una rama `react` o a un repositorio nuevo después de probarla.

## 1. Requisitos

- Node.js 20.19+ o 22.12+ (recomendado versión LTS compatible con Vite 6).
- VS Code + terminal, y Chrome instalado para Jasmine/Karma.

## 2. Ejecutar (Windows PowerShell o terminal VS Code)

```bash
npm install
npm run dev
```

Abrir la URL que indique Vite (normalmente http://localhost:5173/).

Para compilar:

```bash
npm run build
```

## 3. IMPORTANTE: imágenes originales

Los archivos binarios de la carpeta `images/` de GitHub no se incluyeron porque no
fue posible transferir el ZIP original al entorno de creación de este proyecto.

1. Descarga `Code -> Download ZIP` del repositorio original.
2. Extrae su carpeta `images/`.
3. **Copia las imágenes** a `Cachimba-Records-React/public/images/`, respetando los nombres originales.
4. Recarga la aplicación.

Mientras tanto, `ProductImage.jsx` intenta cargar la imagen del repositorio público
y usa un SVG de respaldo si falla. Para entregar una versión autónoma, copia las imágenes.
Esta versión reproduce el enfoque visual general y el contenido disponible, pero aún
no equivale a una migración 1:1 de cada regla CSS del archivo `styles.css` original.

## 4. Supabase: integrar con tu compañero

Esta entrega **NO modifica la base de datos** ni crea tablas. Por defecto muestra
10 vinilos de ejemplo tomados del repositorio. Si tu compañero ya tiene la BD,
pídele: **nombre de la tabla de productos, columnas, reglas RLS y si utiliza Supabase Auth**.

1. Copia `.env.example` como `.env`.
2. Completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con datos públicos del proyecto.
3. Completa `VITE_SUPABASE_PRODUCTS_TABLE` con el nombre EXACTO de la tabla.
4. Ajusta `src/services/products.js` si sus columnas no usan los nombres admitidos.
5. Ejecuta `npm run dev` de nuevo. Se consultará la BD en cuanto la configuración esté completa.

Adaptador actual admite columnas `id`, `title/titulo/nombre`, `price/precio`,
`image/imagen/imagen_url/image_url`, `genre/genero/categoria` y algunas opcionales.
Esto **no significa que ese sea el esquema real**. La tabla y el esquema deben
verificarse con tu compañero antes de prometer integración.

`VITE_SUPABASE_CONTACTS_TABLE` es opcional; si se configura, el formulario intenta
insertar `{nombre,email,mensaje}`. Es necesario verificar nombres de columnas y RLS.
Sin tabla configurada, el frontend **solo valida** y advierte que NO se envió.

El login/registro están preparados para Supabase Auth (email/contraseña), pero
solo funcionan con el proyecto y políticas reales. No hay cobro ni checkout integrado.
**Nunca** pongas una `service_role` o clave secreta en `.env` del frontend.

## 5. ¿Qué componentes hicimos?

- `Header`: menú responsivo y contador de carrito (useCart).
- `ProductCard`: portada, nombre, género, precio y botón. Recibe `product` y `onAdd` por props.
- `ProductGrid`: lista reutilizable con la grilla responsiva Bootstrap.
- `ProductDetail`: galería de portadas, tracklist y botón agregar.
- `CartRow`: fila reutilizable del carrito con cambio de cantidad.
- `LoginForm` / `RegistrationForm`: formularios controlados con estados.
- `Footer`, `ProductImage` y páginas `Home`, `Catalog`, `Cart`, `About`, `Blogs`, `Contact`.

`src/context/CartContext.jsx`: estado compartido y persistencia del carrito en localStorage.
`src/context/ProductsContext.jsx`: carga los datos de Supabase o usa datos locales.
`src/utils/`: lógica pura para carrito, búsqueda y validación.

## 6. Jasmine y Karma: 12 pruebas preparadas

```bash
npm test
```

Las 12 pruebas están en `tests/components.spec.jsx` y cubren agregar, incrementar,
cambiar cantidad, calcular total, eliminar, buscar, validar contactos y registro,
renderizar `ProductCard` e interacciones simuladas con spies de Jasmine.

Importante: estas pruebas están **escritas pero aún no ejecutadas ni verificadas**:
el entorno de creación no tuvo acceso al registro npm para instalar dependencias.
Ejecútalas en tu equipo y conserva la captura de consola como evidencia. Si falla
alguna, compártenos el error para ajustarla antes de entregar.

### Cobertura

La rúbrica exige un **documento de cobertura de testing**. NO se ha calculado
cobertura real ni se debe inventar un porcentaje.

Se incluye `DOCUMENTO_COBERTURA_PENDIENTE.md` como plantilla para llenarla una vez
que el equipo haya ejecutado la suite y configurado instrumentación real (Istanbul
u otra herramienta compatible) en Karma. No confundas número de pruebas con
porcentaje de líneas cubiertas.

## 7. Pendientes reales para cerrar la Evaluación 2

- Confirmar y conectar tablas/columnas reales de Supabase, revisar RLS.
- Copiar imágenes binarias y comparar visualmente con HTML/CSS original.
- Integrar funciones de pago/checkout **solo** si el caso semestral las exige.
- Ejecutar build y 12 tests en tu computadora, corregir cualquier falla.
- Añadir instrumentación y generar cobertura verificable; completar informe.
- Revisar y actualizar ERS; entregar ZIP + enlace GitHub, preparar exposición individual.

## 8. Rúbrica: qué demostrar

- **React**: `ProductCard` usa props; `Catalog` usa estado para filtros y query;
  `CartProvider` centraliza el carrito; `RegistrationForm` tiene validación.
- **Bootstrap**: Header Navbar Collapse, Container, Row, Col, Form.
- **Jasmine/Karma**: explicar describe/it/expect, spies, resultados, cobertura.

No publiques la solución sobre `main` sin revisar los cambios con tu compañero.
