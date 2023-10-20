// config.js
const dotenv = require('dotenv').config();

module.exports = {
    ENVIRONMENT: process.env.ENVIRONMENT || 'development',
    HOST       : process.env.HOST        || '127.0.0.1',
    PORT       : process.env.PORT        || 3002
}