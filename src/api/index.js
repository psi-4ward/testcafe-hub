const express = require('express');
const app = express();

const browserProviderApi = require('./browser-provider');

module.exports = function api() {
  app.use('/browser-provider', browserProviderApi());

  return app;
};