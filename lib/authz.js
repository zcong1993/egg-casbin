const { Enforcer } = require('casbin')
const { DefaultAuthorizer } = require('./authorizer')

module.exports = function authz(options) {
  return async (ctx, next) => {
    const { newEnforcer, authorizer } = options
    const enforcer = await newEnforcer()
    if (!(enforcer instanceof Enforcer)) {
      throw new Error('Invalid enforcer')
    }
    const authzorizer = authorizer ? authorizer(ctx, enforcer) : new DefaultAuthorizer(ctx, enforcer)
    if (!(authzorizer instanceof DefaultAuthorizer)) {
      throw new Error('Please extends BasicAuthorizer class')
    }
    if (!await authzorizer.checkPermission()) {
      ctx.status = 403
      return
    }
    await next()
  }
}
