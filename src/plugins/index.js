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

    await server.register( {
        plugin: require( 'hapi-pagination' ),
        options: {
            query: {
                page: {
                    name: 'page',
                    default: 1
                },
                limit: {
                    name: 'limit',
                    default: 10
                },
                pagination: {
                    name: 'pagination',
                    default: true,
                    active: true
                },
                invalid: 'defaults'
            },

            meta: {
                location: 'body',
                successStatusCode: undefined,
                name: 'meta',
                count: {
                    active: true,
                    name: 'count'
                },
                totalCount: {
                    active: true,
                    name: 'totalCount'
                },
                pageCount: {
                    active: true,
                    name: 'pageCount'
                },
                self: {
                    active: true,
                    name: 'self'
                },
                previous: {
                    active: true,
                    name: 'previous'
                },
                next: {
                    active: true,
                    name: 'next'
                },
                hasNext: {
                    active: false,
                    name: 'hasNext'
                },
                hasPrevious: {
                    active: false,
                    name: 'hasPrevious'
                },
                first: {
                    active: true,
                    name: 'first'
                },
                last: {
                    active: true,
                    name: 'last'
                },
                page: {
                    active: false,
                    // name == default.query.page.name
                },
                limit: {
                    active: false
                    // name == default.query.limit.name
                }
            },

            results: {
                name: 'results'
            },
            reply: {
                paginate: 'paginate'
            },

            routes: {
                include: [],
                exclude: []
            },
            zeroIndex: false
        }
    } )
}