'use strict';

const debug = require('debug')('egg-casbin');
const { DefaultAuthorizer } = require('./authorizer');

let enforcerInstance;
let authzorizerInstance;

module.exports = function authz(options) {
  return async (ctx, next) => {
    const { newEnforcer, authorizer } = options;
    if (!enforcerInstance) {
      debug('init Enforcer instance');
      enforcerInstance = await newEnforcer();
    }
    const enforcer = enforcerInstance;

    if (!authzorizerInstance) {
      debug('init Authorizer instance');
      authzorizerInstance = authorizer ? new authorizer(enforcer) : new DefaultAuthorizer(enforcer);
      if (!(authzorizerInstance instanceof DefaultAuthorizer)) {
        throw new Error('Please extends BasicAuthorizer class');
      }
    }

    const authzorizer = authzorizerInstance;

    if (!await authzorizer.checkPermission(ctx)) {
      ctx.status = 403;
      return;
    }
    await next();
  };
};
