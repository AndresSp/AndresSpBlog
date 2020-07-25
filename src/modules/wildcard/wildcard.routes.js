const Boom = require( '@hapi/boom' );

module.exports = [
    {
        method: '*',
        path: `/{any*}`,
        handler: () => Boom.notImplemented()

    }
]