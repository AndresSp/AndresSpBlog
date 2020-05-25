// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Roles } from '../../roles/roles.js';

Meteor.publish('roles.all', function () {
  return Roles.find();
});
