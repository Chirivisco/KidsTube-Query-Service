const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }]
}, {
    timestamps: true,
    collection: 'playlists'
});

module.exports = mongoose.model('Playlist', playlistSchema); 