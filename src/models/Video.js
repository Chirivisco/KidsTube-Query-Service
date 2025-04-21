const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: String,
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }
}, {
    timestamps: true,
    collection: 'videos'
});

module.exports = mongoose.model('Video', videoSchema); 