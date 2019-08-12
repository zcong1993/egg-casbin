class DefaultAuthorizer {
  constructor (ctx, enforcer) {
    this.ctx = ctx
    this.enforcer = enforcer
  }

  getUserName() {
    throw new Error('please implement this method!')
  }

  async checkPermission() {
    const {ctx, enforcer} = this
    const {originalUrl: path, method} = ctx
    const user = this.getUserName()
    return await enforcer.enforce(user, path, method)
  }
}

module.exports = {
  DefaultAuthorizer
}
