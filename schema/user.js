/**
 * user.js
 *
 * A GraphQL schema needs a store and field definition
 * and a schema allows query of a store
 * and wraps the store and wil return the store
 */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import faker from "faker";

// generate fake user cards for store purposes

var users = [];

for (let i = 0; i < 20; i++) {
  users.push({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  })
}

const STORE = {
  users: users
}

var User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: {type: GraphQLString},
    id: {type: GraphQLString},
    email: {type: GraphQLString}
  })
})

var UserStore = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    users: {type: new GraphQLList(User)}
  })
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: UserStore,
        resolve: () => STORE,
      },
    }),
  }),
})
