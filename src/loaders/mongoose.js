'use strict';

const serviceLocator = require('../lib/service_locator');
const logger = serviceLocator.get('logger');

module.exports = async (user, pass, host, port, name) => {
    const mongoose = serviceLocator.get('mongoose');
    try {
        const connection = await mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        autoIndex: false
        });

        process.on('SIGINT', () => {
        connection.disconnect();
        logger.info(
            'Database Connection closed due to NodeJs process termination'
        );
        process.exit(0);
        });

        return connection.connection.db;
    } catch (error) {
        logger.info('Database Connection Failed, ' + error)
    }
}