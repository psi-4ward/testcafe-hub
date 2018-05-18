# TestCafe Hub POC

Simple prove of concept of a [TestCafe](https://github.com/DevExpress/testcafe) Hub for permanent remote workers.


## HowTo
1. Start the Hub 
  ```shell
  npm install
  node index.js
  ``` 
2. Connect some workers: Open some Browsers an point to [http://localhost:8080](http://localhost:8080)

3. Execute a test run: `node testcafe-hub-run.js`

4. Watch your worker-browsers to open a new tab, connect to testcafe, run the test and close the tab.

**Important** most browsers block popups triggered by JavaScript so permanently allow opening popups for the Hub URL.


Of course, there is a lot to improve :)