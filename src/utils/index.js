'use strict';

const filterMObj = require( './filter-mongoose-obj' )

module.exports = async ( server ) => {
    await server.decorate( 'toolkit', 'filterMObj', filterMObj );
}