'use strict';

const {
  parse,
} = require('url');
const debug = require('debug')('egg-casbin');

class DefaultAuthorizer {
  constructor(enforcer) {
    this.enforcer = enforcer;
  }

  getUserName(/* ctx*/) {
    throw new Error('please implement this method!');
  }

  async checkPermission(ctx) {
    const {
      enforcer,
    } = this;
    const {
      originalUrl,
      method,
    } = ctx;
    const {
      pathname,
    } = parse(originalUrl);
    const user = this.getUserName(ctx);
    const res = await enforcer.enforce(user, pathname, method);
    debug(user, pathname, method);
    return res;
  }
}

module.exports = {
  DefaultAuthorizer,
};
