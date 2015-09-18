var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../schema/user.json');
var plugin = getBabelRelayPlugin(schema.data);

module.exports = plugin
