const express = require('express');
const app = express();
require('./database/config');
require('./startup/boot')(app);
const config = require('config');
require('./logging/logger');
const winston = require('winston');

if (app.get('env') === 'development') {
    winston.log('info', "Hello World from Node.js!");
}


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening ${config.get('name')} on port ${port}`));
module.exports = server;