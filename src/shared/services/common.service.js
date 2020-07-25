'use strict';

const Schmervice = require( 'schmervice' );
const mongoose = require( 'mongoose' );
const Boom = require( '@hapi/boom' );

class CommonService extends Schmervice.Service {
    constructor( ...args ) {
        super( ...args );
    }

    async list( entity ) {
        try {
            const Model = this.server.db.model( entity );
            const docs = await Model.find( {} );
            return docs.map( doc => doc.toObject() )
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async get( entity, id ) {
        try {
            this.checkId( id );
            const Model = this.server.db.model( entity );
            const doc = await Model.findById( id );
            return doc ? doc.toObject() : null
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async create( entity, body ) {
        try {
            const Model = this.server.db.model( entity );
            const model = new Model( body );
            const doc = await model.save()
            return doc.toObject()
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async update( entity, id, body ) {
        try {
            this.checkId( id );
            const Model = this.server.db.model( entity );
            const doc = new Model.findByIdAndUpdate( id, body );
            return doc.toObject()
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    async remove( entity, id ) {
        try {
            this.checkId( id );
            const Model = this.server.db.model( entity );
            const doc = await Model.findByIdAndDelete( id );
            return doc ? doc.toObject() : null
        } catch ( err ) {
            this.errorHandler( err )
        }
    }

    checkId( id ) {
        if ( !mongoose.isValidObjectId( id ) ) {
            throw 'not a valid database id'
        }
    }

    errorHandler( err ) {
        console.error( err )
        throw new Boom.badImplementation( `An internal server error occurred` )
    }
}


module.exports = CommonService