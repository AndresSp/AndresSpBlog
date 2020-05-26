import { Roles } from "./roles/roles";

export const ApiV1 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version: 'v1'
})

ApiV1.addCollection(Meteor.users, {
    excludedEndpoints: ['patch']
});
ApiV1.addCollection(Roles);