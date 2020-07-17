'use strict';
const UserController = require( './user.controller' )
const CommonSchemas = require( './../../shared/schemas/common-params.schema' )

const pathName = 'user'
module.exports = [
  {
    method: 'GET',
    path: `/${pathName}`,
    handler: UserController.get
  },
  {
    method: 'GET',
    path: `/${pathName}/{id}`,
    handler: UserController.getById,
    options: {
      auth: false,
      validate: {
        params: CommonSchemas.objectIdParam
      }
    }
  },
  {
    method: 'POST',
    path: `/${pathName}`,
    handler: UserController.post
  },
  {
    method: 'PATCH',
    path: `/${pathName}/{id}`,
    handler: UserController.patchById,
    options: {
      auth: false,
      validate: {
        params: CommonSchemas.objectIdParam
      }
    }
  },
  {
    method: 'DELETE',
    path: `/${pathName}/{id}`,
    handler: UserController.delete,
    options: {
      auth: false,
      validate: {
        params: CommonSchemas.objectIdParam
      }
    }
  }
]