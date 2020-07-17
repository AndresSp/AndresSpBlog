'use strict';

const Joi = require( '@hapi/joi' );
Joi.objectId = require( 'joi-objectid' )( Joi )

const objectIdParam = Joi.object( {
    id: Joi.objectId()
} );

module.exports = {
    objectIdParam: objectIdParam
}