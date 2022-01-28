'use strict';

const authz = require('./authz');
const { DefaultAuthorizer } = require('./authorizer');

module.exports = {
  authz,
  DefaultAuthorizer,
};
