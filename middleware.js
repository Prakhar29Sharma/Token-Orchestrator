const fs = require('fs');

const logServerRequests = (req, res, next) => {
    
    try {
        
        const url = req.originalUrl;
        const requestMethod = req.method;
        const timestamp = new Date(Date.now()).toUTCString();
        const log = `${timestamp} ${requestMethod} ${url} \n`;

        fs.appendFile('server_logs.txt', log, () => {});

    } catch (err) {
        console.log('error logging server request!');
    }
    next();
}

module.exports = {logServerRequests};