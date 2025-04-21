const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }]
}, {
    timestamps: true,
    collection: 'Usuarios'
});

module.exports = mongoose.model('User', userSchema); 