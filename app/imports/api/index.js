import { Roles } from "./roles/roles";

const ApiV1 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version: 'v1'
})

ApiV1.addCollection(Meteor.users, {
    excludedEndpoints: ['patch']
});
ApiV1.addCollection(Roles);

// Attach Restivus Swagger configuration
// - meta, definitions, params, tags
ApiV1.swagger = {
    meta: {
      swagger: "2.0",
      info: {
        version: "1.0",
        title: "AndresSpBlog API",
        description: "My REST API",
        contact: {
          name: "AndresSp",
          email: "andrestunonsp@gmail.com"
        },
        license: {
          name: "MIT"
        }
      }
    },
    definitions: {
      // Schema definitions for $refs, check spec http://swagger.io/specification/
      // Required for body parameters
    },
    params: {
      // Parameter object definitions to be used in endpoint configurations
      // Path and body parameter types supported in v0.2.0
      petId: {
        name: "id",
        in: "path",
        description: "Pet ID",
        required: true,
        type: "string"
      }
    },
    tags: {
      // Swagger UI tag variables to be used in endpoint grouping
    }
  }

// Generates swagger.json to /api/v1/swagger.json
ApiV1.addSwagger('swagger.json');