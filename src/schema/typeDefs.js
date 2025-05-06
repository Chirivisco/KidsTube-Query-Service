const { gql } = require('apollo-server-express');

/**
 * Esquema GraphQL para KidsTube
 * Define los tipos y operaciones disponibles en la API GraphQL:
 * 
 * Tipos:
 * - User: Información de usuario
 * - Profile: Perfiles de usuario
 * - Video: Videos en playlists
 * - Playlist: Listas de reproducción
 * 
 * Queries:
 * - user: Obtener usuario por ID
 * - users: Listar todos los usuarios
 * - profile: Obtener perfil por ID
 * - profiles: Listar todos los perfiles
 * - profilesByUser: Obtener perfiles de un usuario
 * - video: Obtener video por ID
 * - videos: Listar todos los videos
 * - playlist: Obtener playlist por ID
 * - playlists: Listar todas las playlists
 * - playlistsByProfile: Obtener playlists de un perfil
 * - playlistsByUser: Obtener playlists de un usuario
 * 
 * Mutations:
 * - updatePlaylist: Actualizar playlist
 * - addVideoToPlaylist: Agregar video a playlist
 * - updateVideo: Actualizar video
 * - deleteVideo: Eliminar video
 */

const typeDefs = gql`
    /**
     * Tipo User
     * @typedef {Object} User
     * @property {string} id - ID único del usuario
     * @property {string} email - Email del usuario
     * @property {string} phone - Teléfono del usuario
     * @property {string} name - Nombre completo
     * @property {string} country - País del usuario
     * @property {string} birthdate - Fecha de nacimiento
     * @property {string} profiles - Perfiles asociados
     * @property {string} createdAt - Fecha de creación
     * @property {string} updatedAt - Fecha de actualización
     */
    type User {
        id: ID!
        email: String!
        phone: String!
        name: String!
        country: String
        birthdate: String!
        profiles: [Profile!]
        createdAt: String!
        updatedAt: String!
    }

    /**
     * Tipo Profile
     * @typedef {Object} Profile
     * @property {string} id - ID único del perfil
     * @property {string} fullName - Nombre completo
     * @property {string} pin - PIN de acceso
     * @property {string} avatar - URL del avatar
     * @property {string} role - Rol del perfil (parent/child)
     * @property {string} userId - ID del usuario propietario
     * @property {string} createdAt - Fecha de creación
     * @property {string} updatedAt - Fecha de actualización
     */
    type Profile {
        id: ID!
        fullName: String!
        pin: String!
        avatar: String
        user: User!
        role: String!
        playlists: [Playlist!]
        createdAt: String!
        updatedAt: String!
    }

    /**
     * Tipo Video
     * @typedef {Object} Video
     * @property {string} id - ID único del video
     * @property {string} name - Nombre del video
     * @property {string} url - URL del video
     * @property {string} description - Descripción del video
     * @property {string} playlistId - ID de la playlist
     * @property {string} createdAt - Fecha de creación
     * @property {string} updatedAt - Fecha de actualización
     */
    type Video {
        id: ID!
        name: String!
        url: String!
        description: String
        playlist: Playlist
        createdAt: String!
        updatedAt: String!
    }

    /**
     * Tipo Playlist
     * @typedef {Object} Playlist
     * @property {string} id - ID único de la playlist
     * @property {string} name - Nombre de la playlist
     * @property {string} description - Descripción de la playlist
     * @property {[string]} profiles - IDs de perfiles asociados
     * @property {[Video]} videos - Videos en la playlist
     * @property {string} createdAt - Fecha de creación
     * @property {string} updatedAt - Fecha de actualización
     */
    type Playlist {
        id: ID!
        name: String!
        description: String
        profiles: [Profile!]
        videos: [Video!]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        profiles: [Profile!]!
        profile(id: ID!): Profile
        profilesByUser(userId: ID!): [Profile!]!
        videos: [Video!]!
        video(id: ID!): Video
        playlists: [Playlist!]!
        playlist(id: ID!): Playlist
    }
`;

module.exports = typeDefs; 