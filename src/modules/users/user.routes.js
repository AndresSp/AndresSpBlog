'use strict';
const UserController = require( './user.controller' )
const CommonSchemas = require( './../../shared/schemas/common-params.schema' )

const pathName = 'user'
module.exports = [
  {
    method: 'GET',
    path: `/${pathName}`,
    handler: UserController.get,
    options: {
      auth: false,
      validate: {
        query: CommonSchemas.pagination
      },
      plugins: {
        pagination: {
          enabled: true
        }
      }
    }
  },
  {
    method: 'GET',
    path: `/${pathName}/{id}`,
    handler: UserController.getById,
    options: {
      auth: false,
      validate: {
        params: CommonSchemas.objectId
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
        params: CommonSchemas.objectId
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
        params: CommonSchemas.objectId
      }
    }
  }
]