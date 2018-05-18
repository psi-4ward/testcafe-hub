const createTestCafe = require('testcafe');
const fetch = require('node-fetch');
const promisifyEvent = require('promisify-event');
const log = require('testcafe/lib/cli/log');
const chalk = require('chalk');

(async function() {
  const testcafe = await createTestCafe('localhost');
  const runner = testcafe.createRunner();
  const connectionUrl = testcafe.browserConnectionGateway.connectUrl;

  try {

    // Get remoteCount from hub
    const remoteCount = await(await fetch('http://localhost:8080/api/remoteCount')).text();
    log.write(`Connecting ${remoteCount} remote hub browser(s)...`);
    log.write(`Connect URL: ${chalk.underline.blue(connectionUrl)}`);

    // Wait for connect promises
    const connectionPromises = [];
    for(let i = 0; i < remoteCount; i++) {
      connectionPromises.push(testcafe
        .createBrowserConnection()
        .then(bc => promisifyEvent(bc, 'ready').then(() => bc))
        .then(bc => {
          log.hideSpinner();
          log.write(`${chalk.green('CONNECTED')} ${bc.userAgent}`);
          log.showSpinner();
          return bc;
        })
      );
    }

    // Tell hub to connect the browser
    await fetch('http://localhost:8080/api/run', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url: connectionUrl})
    });

    const browsers = await Promise.all(connectionPromises);

    // run tests
    const failedCount = await runner
      .src('tests/test.js')
      .browsers(browsers)
      .screenshots('screens', true)
      .run();

    // Notify hub about test completion to close the browser(tabs)
    await fetch('http://localhost:8080/api/completed', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url: connectionUrl})
    });

    // end testcafe
    log.hideSpinner();
    testcafe.close();
  }
  catch(e) {
    log.hideSpinner();
    console.error(e.message);
    testcafe.close();
  }
})();
