'use strict';
const UserController = require( './users.controller' )

const pathName = 'users'
module.exports = [
  {
    method: 'GET',
    path: `/${pathName}`,
    handler: ( request, h ) => {
      return 'Hello Routes!';
    },
    options: {
      auth: false,
      validate: {}
    }
  },
  {
    method: 'GET',
    path: `/${pathName}/{id}`,
    handler: ( request, h ) => {
      return `Hello ${request.params.id}!`;
    }
  },
  {
    method: 'POST',
    path: `/${pathName}`,
    handler: UserController.create
  }
]