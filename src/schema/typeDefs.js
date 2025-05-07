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

    type Video {
        id: ID!
        name: String!
        url: String!
        description: String
        playlist: Playlist
        createdAt: String!
        updatedAt: String!
    }

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
        playlistsByProfile(profileId: ID!): [Playlist!]!
        playlistsByUser(userId: ID!): [Playlist!]!
    }

    type Mutation {
        updatePlaylist(id: ID!, name: String, description: String): Playlist!
        addVideoToPlaylist(playlistId: ID!, videoId: ID!): Playlist!
        updateVideo(id: ID!, name: String, url: String, description: String): Video!
        deleteVideo(id: ID!): Boolean!
    }
`;

module.exports = typeDefs; 