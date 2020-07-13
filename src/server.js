'use strict';

require( 'dotenv' ).config();
const config = require( './configs/config' )();

const Hapi = require( '@hapi/hapi' );
const PluginsLoader = require( './plugins/index' );
const UtilsLoader = require( './utils/index' );
const User = require( './models/User' );

const init = async () => {

    const server = Hapi.server( {
        port: 5000,
        host: '0.0.0.0'
    } );

    await PluginsLoader( server )
    await UtilsLoader( server )

    await server.start();
    console.log( 'Server running on %s', server.info.uri );
};

process.on( 'unhandledRejection', ( err ) => {

    console.log( err );
    process.exit( 1 );
} );

init();