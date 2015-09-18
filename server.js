/**
 * server.js
 *
 * @flow
 */

import express from "express"
import graphqlHTTP from "express-graphql"
import path from "path"
import UserSchema from "./schema/user"

const graphQLServer = express()
const app = express()
const GRAPHQL_PORT = 4040
const APP_PORT = 3000


graphQLServer.use("/graphql", graphqlHTTP({ schema: UserSchema, pretty: true })) // express-graphql is strictly a middleware nothing else
graphQLServer.use('/', express.static('public'));

let server = graphQLServer.listen(GRAPHQL_PORT, function () {
  var port = server.address().port;
  console.log('GraphQL listening at port', port);
});
