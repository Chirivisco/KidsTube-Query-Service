const { Profile, Video, Playlist, User } = require('../models');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        // Resolvers para Users
        users: async () => {
            try {
                return await User.find().populate('profiles');
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                throw error;
            }
        },
        user: async (_, { id }) => {
            return await User.findById(id).populate('profiles');
        },

        // Resolvers para Profiles
        profiles: async () => {
            try {
                return await Profile.find().populate('user');
            } catch (error) {
                console.error('Error al obtener perfiles:', error);
                throw error;
            }
        },
        profile: async (_, { id }) => {
            return await Profile.findById(id).populate('user');
        },

        // Resolvers para Videos
        videos: async () => {
            return await Video.find().populate('playlist');
        },
        video: async (_, { id }) => {
            return await Video.findById(id).populate('playlist');
        },

        // Resolvers para Playlists
        playlists: async () => {
            return await Playlist.find().populate('profiles').populate('videos');
        },
        playlist: async (_, { id }) => {
            return await Playlist.findById(id).populate('profiles').populate('videos');
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
    }
};

module.exports = resolvers; 