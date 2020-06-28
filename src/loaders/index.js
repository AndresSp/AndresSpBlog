'use strict';

const config = require('./../configs/config')()
const mongooseLoader = require('./mongoose');
const modelsLoader = require('./models');
const restifyLoader = require('./restify');

module.exports = async ({ restifyApp }) => {
  try {
    const mongoConnection = await mongooseLoader(
      config.mongo.user, 
      config.mongo.pass, 
      config.mongo.host, 
      config.mongo.port,
      config.mongo.name
    );
    console.log('MongoDB Intialized');
    if(mongoConnection){
      await modelsLoader();
      console.log('Models Intialized');
      await restifyLoader({ server: restifyApp });
      console.log('Restify Intialized');
    }
  } catch (error) {
    throw new Error(error)
  }

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}