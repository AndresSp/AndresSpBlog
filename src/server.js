'use strict';

require('dotenv').config();
const config = require('./configs/config')();
const restify = require('restify');
const versioning = require('restify-url-semver');
const joi = require('joi');

// Require DI
const serviceLocator = require('./configs/di');
const validator = require('./lib/validator');
const handler = require('./lib/error_handler');
const routes = require('./routes/routes');
// const Database = require('./configs/database');

const logger = serviceLocator.get('logger');

// Initialize and configure restify server
const server = restify.createServer({
  name: config.app.name,
  versions: ['1.0.0'],
  formatters: {
    'application/json': require('./lib/jsend')
  }
});

// Initialize the database
const Database = require('./configs/database');
new Database(config.mongo.user, config.mongo.pass, config.mongo.host, config.mongo.port);

// Set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());
server.pre(versioning({prefix: '/'}));

// Set request handling and parsing
server.use( restify.plugins.throttle({
	burst: 100,  	// Max 10 concurrent requests (if tokens)
	rate: 2,  		// Steady state: 2 request / 1 seconds
	ip: true,		// throttle per IP
}));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    mapParams: false
  })
);

// initialize validator for all requests
server.use(validator.paramValidation(logger, joi));

server.use(restify.plugins.gzipResponse())

// Setup Error Event Handling
handler.register(server);

// Setup route Handling
routes.register(server, serviceLocator);

// start server
server.listen(config.app.port, () => {
  console.log(`${config.app.name} Server is running on port - ${config.app.port}`);
});