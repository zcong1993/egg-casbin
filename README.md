# egg-casbin

[![NPM version][npm-image]][npm-url]
<!-- [![build status][travis-image]][travis-url] -->
<!-- [![Test coverage][codecov-image]][codecov-url] -->
<!-- [![David deps][david-image]][david-url] -->
<!-- [![Known Vulnerabilities][snyk-image]][snyk-url] -->
[![npm download][download-image]][download-url]

[npm-image]:https://img.shields.io/npm/v/@zcong/egg-casbin.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@zcong/egg-casbin
[travis-image]: https://img.shields.io/travis/eggjs/egg-casbin.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-casbin
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-casbin.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-casbin?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-casbin.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-casbin
[snyk-image]: https://snyk.io/test/npm/egg-casbin/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-casbin
[download-image]: https://img.shields.io/npm/dm/@zcong/egg-casbin.svg?style=flat-square
[download-url]: https://npmjs.org/package/@zcong/egg-casbin

<!--
Description here.
-->

## Install

```bash
$ npm i @zcong/egg-casbin --save
```

## Usage

### Simple Usage

```ts
// app/middleware/casbin.ts
import { authz } from '@zcong/egg-casbin'

export default authz
```

```ts
// {app_root}/config/config.default.ts
// ...
config.casbin = {
  enable: true,
  newEnforcer: async() => {
    const enforcer = await newEnforcer(`${__dirname}/authz_model.conf`, `${__dirname}/authz_policy.csv`)
    return enforcer
  },
}
```

### Use a customized authorizer

```ts
// {app_root}/config/config.default.ts
// ...
class MyAuthorizer extends DefaultAuthorizer {
  // override function
  getUserName(ctx: Context): string {
    return ctx.user.username
  }
}

config.casbin = {
  enable: true,
  newEnforcer: async() => {
    const enforcer = await newEnforcer(`${__dirname}/authz_model.conf`, `${__dirname}/authz_policy.csv`)
    return enforcer
  },
  authorizer: MyAuthorizer,
}
```

## License

[MIT](LICENSE)
