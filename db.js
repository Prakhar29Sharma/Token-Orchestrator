require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('connect', () => {
    console.log('database connected');
});

db.on('disconnect', () => {
    console.log('database disconnected'); 
});

db.on('error', () => {
    console.log('something went wrong! unable to connect..');
});

const mongodb_uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`;

async function connectDatabase () {
    try {
        // try connecting to mongodb database
        await mongoose.connect(mongodb_uri);
        console.log('connected to database successfully!');
    } catch (error) {
        console.error(error);
    }
}

connectDatabase();