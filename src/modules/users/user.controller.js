'use strict';

const Boom = require( '@hapi/boom' );

class UserController {
    constructor() { }

    static async get( request, h ) {
        const { commonService } = request.services( [ 'services-loader' ] );
        const result = await commonService.list( 'User' )
        const response = result.map( ( r ) => h.filterMObj( r ) )
        return h.response( response ).code( 200 )
    }

    static async getById( request, h ) {
        const { id } = request.params;
        const { commonService } = request.services( [ 'services-loader' ] );
        const result = await commonService.get( 'User', id )
        if ( result ) {
            const response = h.filterMObj( result )
            return h.response( response ).code( 200 )
        } else {
            throw new Boom.notFound()
        }
    }

    static async post( request, h ) {
        const { payload } = request;
        const { commonService } = request.services( [ 'services-loader' ] );
        const result = await commonService.create( 'User', payload )
        const response = h.filterMObj( result )
        return h.response( response ).code( 201 )
    }

    static async patchById( request, h ) {
        const { payload } = request;
        const { commonService } = request.services( [ 'services-loader' ] );
        const result = await commonService.update( 'User', id, payload )
        const response = h.filterMObj( result )
        return h.response( response ).code( 200 )
    }

    static async delete( request, h ) {
        const { id } = request.params;
        const { commonService } = request.services( [ 'services-loader' ] );
        await commonService.remove( 'User', id )
        return h.response().code( 204 )
    }

}

module.exports = UserController;