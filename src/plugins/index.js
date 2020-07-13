'use strict';

const config = require( './../configs/config' )();

module.exports = async ( server ) => {

    const { user, pass, host, port } = config.mongo

    await server.register( {
        plugin: require( 'hapi-mongoose' ),
        options: {
            promises: 'native',
            uri: `mongodb://${user}:${pass}@${host}:${port}`,
            mongooseOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                autoIndex: false
            }
        }
    } );

    const db = server.plugins[ 'hapi-mongoose' ].connection; // Get the current connection for this server instance
    const mongoose = server.plugins[ 'hapi-mongoose' ].lib;

    server.decorate( 'server', 'db', db );

    await server.register( {
        plugin: require( './models-plugin' ),
        options: { db, mongoose }
    } );

    await server.register( {
        plugin: require( './routers-plugin' ),
        options: { routesPath: 'src/**/*.routes.js' }
    } );

    await server.register( {
        plugin: require( './services-plugin' ),
        options: { servicesPath: 'src/**/*.service.js' }
    } )
}