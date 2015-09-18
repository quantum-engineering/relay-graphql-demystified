#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import UserSchema from '../schema/user';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
async () => {
  var result = await (graphql(UserSchema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../schema/user.json'),
      JSON.stringify(result, null, 2)
    );
  }
}();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../schema/user.schema.graphql'),
  printSchema(UserSchema)
);
