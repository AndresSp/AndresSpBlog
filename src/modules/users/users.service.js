'use strict';

const Schmervice = require( 'schmervice' );
const Boom = require( '@hapi/boom' );

class UsersService extends Schmervice.Service {
  constructor( ...args ) {
    super( ...args );
  }

  async create( entity, body ) {
    const Model = this.server.db.model( entity );
    // const { username } = body;
    // const user = await Users.findOne( { username } );

    // if ( user ) {
    //   throw new Boom.conflict( 'User with username already exists' )
    // }

    const model = new Model( body );
    return await model.save().toJSON();
  }

  async getUser( username ) {
    const Users = db.model( 'Users' );
    const user = await Users.findOne( { username } );

    if ( !user ) {
      const err = new this.errs.NotFoundError(
        `User with username - ${username} does not exists`
      );
      return err;
    }

    this.log.info( 'User fetched Successfully' );
    return user;
  }
}

module.exports = UsersService;