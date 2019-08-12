import { Enforcer } from 'casbin'
import { Context } from 'egg'
import { Middleware } from 'koa'

export declare const authz: Middleware<Context, {}>

export declare class DefaultAuthorizer {
  protected enforcer: Enforcer;
  
  constructor(enforcer: Enforcer);
  getUserName(ctx: Context): string;
  checkPermission(ctx: Context): Promise<boolean>;
}

export interface CasbinOptions {
  enable: boolean;
  newEnforcer: () => Promise<Enforcer>;
  authorizer?: typeof DefaultAuthorizer;
}

declare module 'egg' {
  interface EggAppConfig {
    casbin: CasbinOptions;
  }
}
