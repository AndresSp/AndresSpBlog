const fs = require( 'fs' );
const path = require( 'path' );

const plugin = {
    name: 'models-loader',
    version: '1.0.0',
    register: async ( server, { db, mongoose } ) => {
        const modelsPath = path.resolve( __dirname, './../models' )

        await new Promise( ( resolve, reject ) => {
            fs.readdir( modelsPath, ( err, files ) => {
                if ( err ) {
                    reject( 'Models Plugin: ' + err )
                }

                if ( !files ) {
                    return
                }

                files.forEach( file => {
                    require( modelsPath + '/' + file )( db, mongoose.Schema )
                } )
                resolve()
            } )
        } )
    }
}

module.exports = plugin