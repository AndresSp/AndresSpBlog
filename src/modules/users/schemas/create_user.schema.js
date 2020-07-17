'use strict';

const Joi = require( '@hapi/joi' );

module.exports = Joi.object().keys( {
  username: Joi.string().alphanum().min( 4 ).max( 15 ).required()
} ).required();