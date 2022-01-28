'use strict';

const {
  newEnforcer,
} = require('casbin');
const {
  DefaultAuthorizer,
} = require('../../../../../lib/index');

exports.keys = '123456';

class MyAuthorizer extends DefaultAuthorizer {
  // override function
  getUserName(/* ctx*/) {
    return 'group';
  }
}

exports.casbin = {
  enable: true,
  newEnforcer: async () => {
    const enforcer = await newEnforcer('examples/authz_model.conf', 'examples/authz_policy.csv');
    return enforcer;
  },
  authorizer: MyAuthorizer,
};
