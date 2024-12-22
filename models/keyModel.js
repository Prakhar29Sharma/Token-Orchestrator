const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    apiKey: {
        type: String,
        require: true,
        unique: true,
    },
    isBlocked: {
        type: Boolean,
        require: true,
        default: true,
    },
    blockedAt: {
        type: String, 
        require: true,
        default: new Date(Date.now()).toISOString(),
    },
    expireAt: {
        type: String,
        require: true,
        default: new Date(Date.now() + (1000 * 60 * 5)).toISOString(), // 1000 * 60 * 5 milliseconds = 5 minutes
    },
    createdAt: {
        type: String,
        require: true,
        default: new Date(Date.now()).toISOString(),
    }
});

const keyModel = mongoose.model('Keys', keySchema);

module.exports = keyModel;