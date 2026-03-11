# Hito 1 – Diseño y prototipo

## 1. Boceto de vistas del proyecto

Vistas mínimas requeridas y breve descripción de su distribución.

### 1.1 Página principal (pública)
- Header con logo, enlace a "Tienda", botones "Registrarse" e "Iniciar sesión".
- Hero section con título, texto descriptivo y botón "Ver publicaciones".
- Sección de categorías destacadas (bloques o tarjetas).
- Grilla de productos destacados (imagen, título, precio, botón "Ver detalle").
- Footer con enlaces informativos.

### 1.2 Registro de usuarios (pública)
- Formulario centrado con campos: Nombre, Email, Contraseña, Confirmar contraseña, Foto (URL u opcional).
- Botón principal "Crear cuenta".
- Texto con enlace a "Iniciar sesión".

### 1.3 Inicio de sesión (pública)
- Formulario centrado con campos: Email y Contraseña.
- Botón "Iniciar sesión".
- Texto con enlace a "Registrarse".

### 1.4 Mi perfil (privada)
- Tarjeta con datos del usuario (foto, nombre, email).
- Sección "Mis publicaciones": listado tipo tarjetas o tabla, con acciones "Editar" y "Eliminar".
- Sección "Mis favoritos": grilla de productos marcados como favoritos.

### 1.5 Formulario para crear una publicación (privada)
- Campos: Título, Descripción, Precio, Categoría, Estado (nuevo/usado), Ubicación, Imágenes (URLs o subida de archivos).
- Botones: "Publicar" y "Cancelar".

### 1.6 Galería de publicaciones (pública)
- Barra de filtros (categoría, rango de precio, ubicación) y buscador por texto.
- Grilla de tarjetas de publicaciones (imagen principal, título, precio, ubicación, botón "Ver detalle").

### 1.7 Vista de detalle de una publicación (pública)
- Layout en dos columnas:
  - Izquierda: galería/carrusel de imágenes de la publicación.
  - Derecha: título, precio, descripción, categoría, ubicación, datos básicos del vendedor.
- Botón "Contactar vendedor".
- Botón "Agregar a favoritos".
- Opcional: mapa con la ubicación aproximada.

---

## 2. Navegación entre vistas (públicas y privadas)

Se definen las rutas principales del frontend y su nivel de acceso.

### 2.1 Rutas públicas
- `/` → Página principal.
- `/login` → Inicio de sesión.
- `/register` → Registro de usuarios.
- `/posts` → Galería de publicaciones.
- `/posts/:id` → Detalle de una publicación.

### 2.2 Rutas privadas (requieren sesión iniciada)
- `/profile` → Vista "Mi perfil" (datos del usuario, mis publicaciones, mis favoritos).
- `/profile/posts/new` → Formulario para crear una publicación.
- `/profile/posts` → Listado de publicaciones del usuario (puede estar incluido dentro de `/profile`).
- `/profile/favorites` → Listado de publicaciones favoritas (puede estar incluido dentro de `/profile`).

### 2.3 Manejo de sesión en el frontend
- Al iniciar sesión se almacena en `localStorage` un objeto con:
  - `token`: token JWT entregado por el backend.
  - `user`: datos básicos del usuario (id, nombre, email, avatarUrl).
- Se utiliza un contexto de autenticación (`AuthContext`) para exponer:
  - `user`, `token`, `isAuthenticated`, `login()`, `logout()`.
- Las rutas privadas se protegen con un componente `PrivateRoute` que:
  - Si `isAuthenticated` es verdadero → muestra la vista privada.
  - Si no → redirige a `/login`.

---

## 3. Dependencias del proyecto

### 3.1 Dependencias en el Frontend
- React
- React DOM
- React Router DOM
- Axios
- Vite (herramienta de build y dev server)
- Framework CSS: estilos personalizados simples (puede reemplazarse por Tailwind CSS, Bootstrap u otro framework si se desea en hitos posteriores).

### 3.2 Dependencias en el Backend
- Node.js
- Express
- Cors
- Dotenv
- Jsonwebtoken (JWT)
- Bcryptjs (para encriptar contraseñas en hitos siguientes)
- (Opcional para hitos siguientes) ORM como Sequelize o Prisma y base de datos relacional (PostgreSQL / MySQL).

---

## 4. Diseño de tablas de base de datos y relaciones

Modelo relacional propuesto para el Marketplace.

### 4.1 Tabla `users`
- `id` (PK, int, autoincremental)
- `name` (varchar)
- `email` (varchar, único)
- `password_hash` (varchar)
- `avatar_url` (varchar, nullable)
- `created_at` (datetime)

### 4.2 Tabla `posts`
- `id` (PK, int, autoincremental)
- `user_id` (FK → users.id)
- `title` (varchar)
- `description` (text)
- `price` (decimal)
- `category` (varchar)
- `status` (enum: 'nuevo', 'usado')
- `location` (varchar)
- `created_at` (datetime)
- `updated_at` (datetime)

### 4.3 Tabla `post_images`
- `id` (PK, int, autoincremental)
- `post_id` (FK → posts.id)
- `url` (varchar)
- `order` (int) – orden en el carrusel de imágenes

### 4.4 Tabla `favorites`
- `id` (PK, int, autoincremental)
- `user_id` (FK → users.id)
- `post_id` (FK → posts.id)
- Restricción única (`user_id`, `post_id`) para evitar duplicados.

### 4.5 Relaciones principales
- Un `user` tiene muchas `posts`.
- Un `post` pertenece a un `user`.
- Un `post` tiene muchas `post_images`.
- Un `user` puede marcar muchos `posts` como favoritos mediante `favorites`.

Este modelo se puede dibujar en Draw.io utilizando entidades y relaciones 1:N y N:M (a través de `favorites`).

---

## 5. Contrato de datos de la API REST

Se describen las rutas principales y la forma de las peticiones y respuestas.

### 5.1 Autenticación y usuarios

#### POST `/api/users` – Registro de usuario
**Request body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "avatarUrl": "string (opcional)"
}
```

**Response 201**
```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "avatarUrl": "string | null"
}
```

#### POST `/api/auth/login` – Inicio de sesión
**Request body**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response 200**
```json
{
  "token": "jwt-string",
  "user": {
    "id": 1,
    "name": "string",
    "email": "string",
    "avatarUrl": "string | null"
  }
}
```

#### GET `/api/auth/me` – Usuario autenticado actual (privado)
Encabezado: `Authorization: Bearer <token>`

**Response 200**
```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "avatarUrl": "string | null"
}
```

### 5.2 Publicaciones

#### GET `/api/posts` – Listar publicaciones (público)
Parámetros de query opcionales: `search`, `category`, `minPrice`, `maxPrice`.

**Response 200**
```json
[
  {
    "id": 1,
    "title": "string",
    "price": 1000,
    "mainImage": "string",
    "location": "string",
    "category": "string"
  }
]
```

#### GET `/api/posts/:id` – Detalle de publicación (público)
**Response 200**
```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "price": 1000,
  "status": "nuevo",
  "category": "string",
  "location": "string",
  "user": {
    "id": 1,
    "name": "string",
    "avatarUrl": "string | null"
  },
  "images": [
    { "id": 10, "url": "string" }
  ],
  "isFavorite": true
}
```

#### POST `/api/posts` – Crear publicación (privado)
Encabezado: `Authorization: Bearer <token>`

**Request body**
```json
{
  "title": "string",
  "description": "string",
  "price": 1000,
  "status": "nuevo",
  "category": "string",
  "location": "string",
  "images": ["url1", "url2"]
}
```

**Response 201**
```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "price": 1000,
  "status": "nuevo",
  "category": "string",
  "location": "string",
  "mainImage": "url1"
}
```

#### PUT `/api/posts/:id` – Editar publicación (privado, dueño)
**Request body**: mismos campos que en `POST /api/posts` (parciales o completos).

#### DELETE `/api/posts/:id` – Eliminar publicación (privado, dueño)
**Response 204** sin contenido.

### 5.3 Favoritos

#### GET `/api/favorites` – Listar favoritos del usuario (privado)
**Response 200**
```json
[
  {
    "id": 1,
    "userId": 1,
    "postId": 2
  }
]
```

#### POST `/api/favorites` – Agregar favorito (privado)
**Request body**
```json
{
  "postId": 1
}
```

**Response 201**
```json
{
  "id": 1,
  "userId": 1,
  "postId": 1
}
```

#### DELETE `/api/favorites/:postId` – Eliminar favorito (privado)
**Response 204** sin contenido.

---

Con este documento y el código del proyecto se cubren todos los requerimientos del Hito 1: bocetos de vistas, navegación pública/privada, listado de dependencias, modelo de base de datos y contrato básico de la API REST.
