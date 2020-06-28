'use strict';

require('dotenv').config();
const config = require('./configs/config')();
const restify = require('restify');

// Require DI
const serviceLocator = require('./configs/di');
const handler = require('./lib/error_handler');
const routes = require('./routes/routes');
//Loaders
const loaders = require('./loaders/index');

// Initialize and configure restify server
const server = restify.createServer({
  name: config.app.name,
  versions: ['1.0.0'],
  formatters: {
    'application/json': require('./lib/jsend')
  }
});

async function startServer() {
  try {
    await loaders({ restifyApp: server })

    // Setup Error Event Handling
    handler.register(server);

    // Setup route Handling
    routes.register(server, serviceLocator);

    // start server
    server.listen(config.app.port, () => {
      console.debug(`${config.app.name} Server is running on port - ${config.app.port}`);
    });
  } catch (error) {
    console.error(error)
  }
}

startServer()