'use strict';

const Schmervice = require( 'schmervice' );
const Boom = require( '@hapi/boom' );

class CommonService extends Schmervice.Service {
    constructor( ...args ) {
        super( ...args );
    }

    async list( entity ) {
        try {
            const Model = this.server.db.model( entity );
            const models = await Model.find( {} );
            return models.lean()
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async get( entity, id ) {
        try {
            const Model = this.server.db.model( entity );
            const model = await Model.findById( id );
            return model.lean()
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async create( entity, body ) {
        try {
            const Model = this.server.db.model( entity );
            const model = Model.create( body ).lean();
            return model.lean()
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async update( entity, id, body ) {
        try {
            const Model = this.server.db.model( entity );
            const model = new Model.findByIdAndUpdate( id, body );
            return model.lean()
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async remove( entity, id ) {
        try {
            const Model = this.server.db.model( entity );
            await Model.findByIdAndDelete( id );
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    errorHandler( err ) {
        console.error( err )
        throw new Boom.badImplementation( `An internal server error occurred` )
    }
}


module.exports = CommonService