module.exports = class Node {
  constructor({socket, ...data}) {
    this.socket = socket;
    this.data = data;
  }

  getData() {
    return this.data;
  }

  matchesName(name) {
    const tmp = name.split(':');
    const [browser, browserVersion] = tmp[0].split('@');
    let os, osVersion;
    if(tmp[1]) [os, osVersion] = tmp[1].split(' ');
    let match = this.data.browser === browser;
    if(browserVersion && !this.data.browserVersion.startsWith(browserVersion)) match = false;
    if(os && this.data.os !== os) match = false;
    if(osVersion && !this.data.osVersion.startsWith(osVersion)) match = false;
    return match;
  }

  async openBrowser(id, url) {
    return new Promise((resolve, reject) => {
      this.socket.emit('open-browser', {id, url}, res => {
        if(res === true) return resolve();
        reject(new Error(res));
      });
    });
  }

  async closeBrowser(id) {
    return new Promise((resolve, reject) => {
      this.socket.emit('close-browser', {id}, res => {
        if(res === true) return resolve();
        reject(new Error(res));
      });
    });
  }

  async canResizeToDimensions() {
    return false;
  }

  async maximizeWindow() {
    console.log('TODO maximizeWindow');
  }

  async resizeWindow() {
    throw new Error('Not supported');
  }

  async takeScreenshot() {
    console.log('TODO takeScreenshot');
  }
};