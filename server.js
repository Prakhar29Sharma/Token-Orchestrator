require('dotenv').config();

const express = require('express');
require('./db.js');

const keyRoute = require('./routes/keyRoute.js');
const { keepKeyAlive } = require('./controllers/keyController.js');
const { deleteExpiredTokens, deleteBlockedTokens } = require('./utility.js');
const { logServerRequests } = require('./middleware.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logServerRequests);

app.use('/key', keyRoute);

app.put('/keepalive/:id', keepKeyAlive);

setInterval(() => {
    deleteExpiredTokens();
    deleteBlockedTokens();
}, 1000);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});