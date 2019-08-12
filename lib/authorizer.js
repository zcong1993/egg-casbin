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
    const user = this.getUserName()
    return await enforcer.enforce(user, path, method)
  }
}

module.exports = {
  DefaultAuthorizer
}
