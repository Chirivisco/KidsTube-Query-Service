/**
 * Resolvers de GraphQL para KidsTube
 * Implementa la lógica para resolver las queries y mutations definidas en el esquema
 */

const { Profile, Video, Playlist, User } = require('../models');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        /**
         * Obtiene un usuario por su ID
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.id - ID del usuario
         * @returns {Promise<Object>} Usuario encontrado
         */
        user: async (parent, { id }) => {
            return await User.findById(id).populate('profiles');
        },

        /**
         * Obtiene todos los usuarios
         * @returns {Promise<Array>} Lista de usuarios
         */
        users: async () => {
            try {
                return await User.find().populate('profiles');
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                throw error;
            }
        },

        /**
         * Obtiene un perfil por su ID
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.id - ID del perfil
         * @returns {Promise<Object>} Perfil encontrado
         */
        profile: async (parent, { id }) => {
            return await Profile.findById(id).populate('user');
        },

        /**
         * Obtiene todos los perfiles
         * @returns {Promise<Array>} Lista de perfiles
         */
        profiles: async () => {
            try {
                return await Profile.find().populate('user');
            } catch (error) {
                console.error('Error al obtener perfiles:', error);
                throw error;
            }
        },

        /**
         * Obtiene los perfiles de un usuario
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.userId - ID del usuario
         * @returns {Promise<Array>} Lista de perfiles del usuario
         */
        profilesByUser: async (parent, { userId }) => {
            try {
                return await Profile.find({ user: userId }).populate('user');
            } catch (error) {
                console.error('Error al obtener perfiles por usuario:', error);
                throw error;
            }
        },

        /**
         * Obtiene un video por su ID
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.id - ID del video
         * @returns {Promise<Object>} Video encontrado
         */
        video: async (parent, { id }) => {
            return await Video.findById(id).populate('playlist');
        },

        /**
         * Obtiene todos los videos
         * @returns {Promise<Array>} Lista de videos
         */
        videos: async () => {
            return await Video.find().populate('playlist');
        },

        /**
         * Obtiene una playlist por su ID
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.id - ID de la playlist
         * @returns {Promise<Object>} Playlist encontrada
         */
        playlist: async (parent, { id }) => {
            return await Playlist.findById(id).populate('profiles').populate('videos');
        },

        /**
         * Obtiene todas las playlists
         * @returns {Promise<Array>} Lista de playlists
         */
        playlists: async () => {
            return await Playlist.find().populate('profiles').populate('videos');
        },

        /**
         * Obtiene las playlists de un perfil
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.profileId - ID del perfil
         * @returns {Promise<Array>} Lista de playlists del perfil
         */
        playlistsByProfile: async (parent, { profileId }) => {
            // ... existing code ...
        },

        /**
         * Obtiene las playlists de un usuario
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la query
         * @param {string} args.userId - ID del usuario
         * @returns {Promise<Array>} Lista de playlists del usuario
         */
        playlistsByUser: async (parent, { userId }) => {
            // ... existing code ...
        }
    },
    Profile: {
        playlists: async (parent) => {
            return await Playlist.find({ profiles: parent.id }).populate('videos');
        }
    },
    Playlist: {
        profiles: async (parent) => {
            return await Profile.find({ _id: { $in: parent.profiles } });
        },
        videos: async (parent) => {
            return await Video.find({ playlist: parent.id });
        }
    },
    Video: {
        playlist: async (parent) => {
            return await Playlist.findById(parent.playlist);
        }
    },

    Mutation: {
        /**
         * Actualiza una playlist existente
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la mutation
         * @param {string} args.id - ID de la playlist
         * @param {string} args.name - Nuevo nombre
         * @param {string} args.description - Nueva descripción
         * @param {Array<string>} args.profiles - Nuevos perfiles asociados
         * @returns {Promise<Object>} Playlist actualizada
         */
        updatePlaylist: async (parent, { id, name, description, profiles }) => {
            // ... existing code ...
        },

        /**
         * Agrega un video a una playlist
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la mutation
         * @param {string} args.playlistId - ID de la playlist
         * @param {string} args.name - Nombre del video
         * @param {string} args.url - URL del video
         * @param {string} args.description - Descripción del video
         * @returns {Promise<Object>} Video creado
         */
        addVideoToPlaylist: async (parent, { playlistId, name, url, description }) => {
            // ... existing code ...
        },

        /**
         * Actualiza un video existente
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la mutation
         * @param {string} args.id - ID del video
         * @param {string} args.name - Nuevo nombre
         * @param {string} args.url - Nueva URL
         * @param {string} args.description - Nueva descripción
         * @returns {Promise<Object>} Video actualizado
         */
        updateVideo: async (parent, { id, name, url, description }) => {
            // ... existing code ...
        },

        /**
         * Elimina un video
         * @param {Object} parent - Resultado del resolver padre
         * @param {Object} args - Argumentos de la mutation
         * @param {string} args.id - ID del video
         * @returns {Promise<boolean>} true si se eliminó correctamente
         */
        deleteVideo: async (parent, { id }) => {
            // ... existing code ...
        }
    }
};

module.exports = resolvers; 