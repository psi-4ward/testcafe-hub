# TestCafe-Hub

Prove of concept of a [TestCafe](https://github.com/DevExpress/testcafe) Hub for permanent remote workers.  

Of course, there is a lot to improve :)

## Setup
1. Install and start the Hub  
  You could adjust the port using `PORT` environment variable.  
  ```shell
  npm install
  npm start
  ``` 

2. Open Hub Dashboard: `http://<hub-ip>:8080`
  
3. Connect some Tab-workers: Open `http://<hub-ip>:8080/worker` in some browsers.   
   **Important** most browsers block popups triggered by JavaScript so you have to permanently allow opening popups for the Hub URL.


## Usage 

Use [testcafe-browser-provider-hub](https://github.com/psi-4ward/testcafe-browser-provider-hub) plugin to run tests on hub nodes.


```bash
# Install (globally)
$ npm install -g testcafe psi-4ward/testcafe-browser-provider-hub

# List browser
$ testcafe -b hub
"hub:Firefox@59.0.0:Linux 0.0.0"
"hub:Chrome@66.0.3359:Linux 0.0.0"
"hub:Chrome Mobile@66.0.3359:Android 7.0.0"
"hub:Edge@12.10240.0:Windows 10.0.0"

# Run tests
testcafe "hub:Firefox,hub:Edge@12:Windows 10" myTest.js 
```

## Authors

* [Christoph Wiechert](https://psi.cx)

## License & copyright
* [testcafe-browser-provider-hub](https://github.com/psi-4ward/testcafe-hub/blob/master/LICENSE): MIT
