const express = require('express');
const app = express();

const nodes = require('../../nodes');

const getBrowserList = require('./get-browser-list');
const openBrowser = require('./open-browser');
const closeBrowser = require('./close-browser');
const canResizeWindowToDimensions = require('./can-resize-window-to-dimensions');
// const maximizeWindow = require('./maximize-window');
const resizeWindow = require('./resize-window');
// const takeScreenshot = require('./take-screenshot');

module.exports = function browserProviderApiFactory() {
  app.get('/get-browser-list', getBrowserList(nodes));
  app.post('/open-browser', openBrowser(nodes));
  app.post('/close-browser', closeBrowser(nodes));
  app.post('/can-resize-window-to-dimensions', canResizeWindowToDimensions(nodes));
  // app.post('/maximize-window', maximizeWindow(nodes));
  app.post('/resize-window', resizeWindow(nodes));
  // app.post('/take-screenshot', takeScreenshot(nodes));
  return app;
};