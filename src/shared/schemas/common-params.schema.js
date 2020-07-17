'use strict';

const Joi = require( '@hapi/joi' );
Joi.objectId = require( 'joi-objectid' )( Joi )

const objectIdParam = Joi.object( {
    id: Joi.objectId()
} );

const paginationQueryParam = Joi.object( {
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    pagination: Joi.boolean()
} );

module.exports = {
    objectId: objectIdParam,
    pagination: paginationQueryParam
}