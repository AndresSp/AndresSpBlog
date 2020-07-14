'use strict';
const UserController = require( './user.controller' )

const pathName = 'user'
module.exports = [
  {
    method: 'GET',
    path: `/${pathName}`,
    handler: UserController.get,
    // options: {
    //   auth: false,
    //   validate: {}
    // }
  },
  {
    method: 'GET',
    path: `/${pathName}/{id}`,
    handler: UserController.getById
  },
  {
    method: 'POST',
    path: `/${pathName}`,
    handler: UserController.post
  },
  {
    method: 'PATCH',
    path: `/${pathName}/{id}`,
    handler: UserController.patchById
  },
  {
    method: 'DELETE',
    path: `/${pathName}/{id}`,
    handler: UserController.delete
  }
]