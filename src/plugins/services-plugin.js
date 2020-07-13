const glob = require( 'glob' );
const path = require( 'path' );
const Schmervice = require( 'schmervice' );

const plugin = {
    name: 'services-loader',
    version: '1.0.0',
    register: async ( server, { servicesPath } ) => {

        await server.register( Schmervice );

        const files = await new Promise( ( resolve, reject ) => {
            glob( servicesPath, function ( err, files ) {

                if ( err ) {
                    reject( 'Services  Plugin: ' + err )
                }

                if ( !files ) {
                    return
                }
                resolve( files )
            } )
        } )

        const services = files.reduce( ( servicesAcc, file ) => {
            const pathFile = path.resolve( process.cwd(), file )
            const currentService = require( pathFile )
            return servicesAcc.concat( currentService )
        }, [] )

        await server.registerService( services )
    }
}

module.exports = plugin