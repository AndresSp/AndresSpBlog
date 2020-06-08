const restify = require( 'restify' );
const router = new ( require( 'restify-router' ) ).Router();

const config = require( './config/env' );
const logger = require( './config/logger' );

const routes = require( './routes' );

const server = restify.createServer( {
	name: config.name,
	version: config.version,
} );

server.use( restify.plugins.throttle( {
	burst: 100,  	// Max 10 concurrent requests (if tokens)
	rate: 2,  		// Steady state: 2 request / 1 seconds
	ip: true,		// throttle per IP
} ) );

server.use( restify.plugins.bodyParser() );
server.use( restify.plugins.acceptParser( server.acceptable ) );
server.use( restify.plugins.queryParser() );
server.use( restify.plugins.gzipResponse() );

router.add( '/api', routes );
router.applyRoutes( server );

server.on( 'after', restify.plugins.metrics( { server: server }, function onMetrics( err, metrics ) {
	logger.trace( `${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms` );
} ) );

server.listen( config.port, function () {
	logger.info( '%s listening at %s', server.name, server.url );
} );

server.on( 'uncaughtException', function ( req, res, route, err ) {
	logger.error( err );
} );