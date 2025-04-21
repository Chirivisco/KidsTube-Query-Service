const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['main', 'restricted'],
        default: 'restricted'
    }
}, {
    timestamps: true,
    collection: 'Perfiles'
});

module.exports = mongoose.model('Profile', profileSchema); 