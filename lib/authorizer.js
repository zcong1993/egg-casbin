const debug = require('debug')('egg-casbin')

class DefaultAuthorizer {
  constructor (enforcer) {
    this.enforcer = enforcer
  }

  getUserName(ctx) {
    throw new Error('please implement this method!')
  }

  async checkPermission(ctx) {
    const { enforcer } = this
    const { originalUrl: path, method } = ctx
    const user = this.getUserName(ctx)
    const res = await enforcer.enforce(user, path, method)
    debug(user, path, method)
    return res
  }
}

module.exports = {
  DefaultAuthorizer
}
