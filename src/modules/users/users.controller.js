'use strict';

class UsersController {
    constructor() { }

    static async create( request, h ) {
        const { payload } = request;
        const { usersService } = request.services( [ 'services-loader' ] );
        const entity = await usersService.create( payload, 'User' )
        const response = h.filterMObj( entity )
        return h.response( response ).code( 201 )
    }

    static async get( request, reply ) {
        try {
            const { username } = req.params;
            const result = await this.userService.getUser( username );

            res.send( result );
        } catch ( err ) {
            this.log.error( err.message );
            res.send( err );
        }
    }

    static async delete( request, reply ) {
        try {
            reply.response().code( 204 )
        } catch ( err ) {
            this.log.error( err.message );
            res.send( err );
        }
    }

}

module.exports = UsersController;