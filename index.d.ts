import { Enforcer } from 'casbin'
import { Context } from 'egg'
import { Middleware } from 'koa'

export declare const authz: Middleware<Context, {}>

export declare class DefaultAuthorizer {
  constructor(ctx: Context, enforcer: Enforcer);
  getUserName(): string;
  checkPermission(): Promise<boolean>;
}

export interface CasbinOptions {
  enable: boolean;
  newEnforcer: Enforcer;
  authorizer: DefaultAuthorizer;
}

declare module 'egg' {
  interface EggAppConfig {
    casbin: CasbinOptions;
  }
}
