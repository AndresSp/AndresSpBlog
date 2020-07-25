'use strict';

const Lab = require( '@hapi/lab' );
const { expect } = require( '@hapi/code' );
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init, start } = require( '../src/server/server' );

describe( 'GET /', () => {
    let server;

    beforeEach( async () => {
        server = await init();
    } );

    afterEach( async () => {
        await server.stop();
    } );

    it( 'responds with 501', async () => {
        const res = await server.inject( {
            method: 'get',
            url: '/'
        } );
        expect( res.statusCode ).to.equal( 501 );
    } );
} );