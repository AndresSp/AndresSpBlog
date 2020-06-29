'use strict';

const serviceLocator = require('../lib/service_locator');
const restify = require('restify');
const versioning = require('restify-url-semver');
const joi = require('@hapi/joi');
const validator = require('./../lib/validator');

const logger = serviceLocator.get('logger');

module.exports = async ({ server }) => {
    try {
        
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

        return server
    } catch (error) {
        logger.info('Server Initialization Failed, ' + error)
    }
}
