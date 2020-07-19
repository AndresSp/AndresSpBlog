`use strict`;

const { init, start } = require( './server/server' );

const startServer = async () => {
    await init();
    await start();
}

startServer();