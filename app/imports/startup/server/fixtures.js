// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Roles } from '../../api/roles/roles.js';


Meteor.startup(() => {
  const today = new Date();

  if(Meteor.users.find().count() === 0){
    Accounts.createUser({
      username: 'AndresSp',
      email: 'andrestunonsp@gmail.com',
      password: 'admin'
    })
  }

  if(Roles.find().count() === 0){

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
      return (
          roles.slice(0,i+1).reduce((total, current) => ({
          ...current,
          permissions: [...total.permissions, ...current.permissions]
          }), {permissions: []})
        )
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
