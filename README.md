# KidsTube Query Service

Servicio GraphQL dedicado a la lectura de datos para KidsTube, optimizado para consultas eficientes y caché.

## 🚀 Características

- Servicio GraphQL dedicado a operaciones de lectura
- Optimizado para consultas eficientes
- Sistema de caché para consultas frecuentes
- Integración con MongoDB
- Autenticación y autorización
- Validación de datos
- Documentación automática con GraphQL Playground

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- MongoDB
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/KidsTube-Query-Service.git
cd KidsTube-Query-Service
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con tus configuraciones.

## ⚙️ Configuración

El archivo `.env` debe contener:

```env
PORT=4001
MONGODB_URI=mongodb://localhost:27017/kidstube
JWT_SECRET=tu_jwt_secret
NODE_ENV=development
CACHE_TTL=3600
```

## 🚀 Uso

1. Iniciar el servidor en desarrollo:
```bash
npm run dev
```

2. Iniciar el servidor en producción:
```bash
npm start
```

## 📚 Schema GraphQL

### Queries Disponibles

#### Perfiles
```graphql
type Query {
  profile(id: ID!): Profile
  profiles(userId: ID!): [Profile]
}

type Profile {
  id: ID!
  name: String!
  avatar: String
  type: String!
  userId: ID!
  playlists: [Playlist]
}
```

#### Playlists
```graphql
type Query {
  playlist(id: ID!): Playlist
  playlists(profileId: ID!): [Playlist]
}

type Playlist {
  id: ID!
  name: String!
  description: String
  profileId: ID!
  videos: [Video]
}
```

#### Videos
```graphql
type Query {
  video(id: ID!): Video
  videos(playlistId: ID!): [Video]
}

type Video {
  id: ID!
  name: String!
  url: String!
  playlistId: ID!
}
```

## 🔒 Autenticación

Todas las queries requieren un token JWT válido en el header:

```bash
Authorization: Bearer <token>
```

## 🧪 Testing

```bash
npm test
```

## 📦 Estructura del Proyecto
