'use strict';

const config = require('../config/config.default');

module.exports = app => {
  const {
    router,
    controller,
  } = app;
  const casbin = app.middleware.casbin(config.casbin);
  router.get('/', casbin, controller.home.index);
};
