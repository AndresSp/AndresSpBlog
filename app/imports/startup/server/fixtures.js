// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Roles } from '../../api/roles/roles.js';


Meteor.startup(() => {
  if(Roles.find().count() === 0){
    const today = new Date();

    const roles = [
      {
        name: 'guest',
        permissions: []
      },
      {
        name: 'member',
        permissions: [
          'create:posts',
          'edit:own:posts',
          'delete:own:posts',
          'comment:posts',
          'edit:own:comments',
          'delete:own:comments'
        ]
      },
      {
        name: 'mod',
        permissions: [
          'delete:comments',
          'delete:posts'
        ]
      },
      {
        name: 'admin',
        permissions: [
          'assign:roles'
        ]
      },
      {
        name: 'founder',
        permissions: [
          'edit:users',
          'delete:users',
          'permissions',
          'roles',
          'assign:permissions'
        ]
      }
    ]

    const rolesSumed = roles.map((_,i) => {
        roles.slice(0,i+1).reduce((total, current) => ({
        ...current,
        permissions: [...total.permissions, ...current.permissions]
      }), {permissions: []})
    })

    rolesSumed.forEach(role => Roles.insert({
      ...role,
      ...{ 
        createdAt: today,
        updatedAt: today 
      }
    }))
  }
});
