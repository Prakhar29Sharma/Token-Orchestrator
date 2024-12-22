const { response } = require('express');
const Keys = require('../models/keyModel.js');
const { v4: uuidv4 } = require('uuid');

// CREATE 

const createToken = async (req, res) => {
    try {
        const key = await Keys({
            apiKey: uuidv4(),
        }).save();
        return res.status(201).json({
            keyId: key._id,
            message: 'created a new token',
        });
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: 'Something went wrong',
        });
    }
};

// READ

const getAvailableKey = async (req, res) => {
    try {
        const availableKeys = await Keys.find({ isBlocked: false });
        // randomly select key from available key
        const randomKey = availableKeys[Math.round(Math.random() * availableKeys.length)];
        const key = await Keys.findById(randomKey._id);
        key.isBlocked = true;
        key.blockedAt = new Date(Date.now()).toISOString();
        await key.save();
        return res.status(200).json({
            keyId: key._id,
            apiKey: key.apiKey,
            message: 'fetched available key',
        });
    } catch (err) {
        return res.status(401).json({
            message: 'token not found',
        });
    }
}

const getKeyDetails = async (req, res) => {
    try {
        const keyId = req.params.id;
        const key = await Keys.findById(keyId);
        return res.status(200).json({
            keyId: key._id,
            apiKey: key.apiKey,
            expireAt: key.expireAt,
            blockedAt: key.blockedAt,
            createdAt: key.createdAt,
            message: 'Key details fetched successfully',
        });
    } catch (err) {
        return res.status(404).json({
            error: err,
            message: 'Key not found!',
        });
    }
}

// UPDATE

const unblockKey = async (req, res) => {
    try {
        const keyId = req.params.id;
        const key = await Keys.findById(keyId);
        key.isBlocked = false;
        key.blockedAt = '';
        await key.save();
        return res.status(200).json({
            message: 'Key with id ' + keyId + ' got unblocked',
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Key not found',
        });
    }
}

const keepKeyAlive = async (req, res) => {
    try {
        const keyId = req.params.id;
        const key = await Keys.findOneAndUpdate({_id: keyId}, {expireAt: new Date(Date.now() + (1000 * 60 * 5)).toISOString()});
        return res.status(200).json({
            response: key,
            message: 'Key expire time reset done',
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Key not found!',
        });
    }
}

// DELETE

const deleteKey = async (req, res) => {
    try {
        const keyId = req.params.id;
        const resposne = await Keys.findByIdAndDelete(keyId);
        return res.status(200).json({
            details: response,
            message: 'Key deleted successfully',
        });
    } catch (err) {
        return res.status(404).json({
            message: 'Key not found',
        });
    }
}

module.exports = { createToken, getAvailableKey, getKeyDetails, unblockKey, keepKeyAlive, deleteKey };