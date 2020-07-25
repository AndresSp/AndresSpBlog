const glob = require( 'glob' );
const path = require( 'path' );

const plugin = {
    name: 'routers-loader',
    version: '1.0.0',
    register: async ( server, { routesPath } ) => {

        const files = await new Promise( ( resolve, reject ) => {
            glob( routesPath, function ( err, files ) {

                if ( err ) {
                    reject( 'Routers Plugin: ' + err )
                }

                if ( !files ) {
                    return
                }
                resolve( files )
            } )
        } )

        const routeObjs = files.reduce( ( routes, file ) => {
            const pathFile = path.resolve( process.cwd(), file )
            const currentRoutes = require( pathFile )
            return routes.concat( currentRoutes )
        }, [] )

        routeObjs.map( route => {
            server.route( route )
        } )
    }
}

module.exports = plugin