'use strict';

const serviceLocator = require('../lib/service_locator');
const logger = serviceLocator.get('logger');

class Database {
  constructor(user, pass, host, port) {
    this.mongoose = serviceLocator.get('mongoose');
    this._connect(user, pass, host, port);
  }

  _connect(user, pass, host, port) {
    this.mongoose.Promise = global.Promise;
    this.mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}`, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    const {connection} = this.mongoose;
    connection.on('connected', () =>
      logger.info('Database Connection was Successful')
    );
    connection.on('error', (err) =>
      logger.info('Database Connection Failed' + err)
    );
    connection.on('disconnected', () =>
      logger.info('Database Connection Disconnected')
    );
    process.on('SIGINT', () => {
      connection.close();
      logger.info(
        'Database Connection closed due to NodeJs process termination'
      );
      process.exit(0);
    });

    // initialize Model
    require('../models/User');
  }
}

module.exports = Database;