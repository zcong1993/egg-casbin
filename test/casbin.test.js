'use strict';

const mock = require('egg-mock');

describe('test/casbin.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/casbin-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET 403', () => {
    return app.httpRequest()
      .get('/')
      .expect(403);
  });
});
