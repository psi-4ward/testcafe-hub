const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const getMyHostname = require('endpoint-utils').getMyHostname;
const PORT = process.env.PORT || 8080;

const socketio = require('./src/socketio');
const api = require('./src/api');

app.use(bodyParser.json());
app.use(express.static('public'));

// Enable /api endpoint
app.use('/api', api());

// Add socket.io integration
socketio(server);

// 404 handler
app.use(function(req, res) {
  res.status(404).send('Not found');
});

// Bootstrap TestCafe Hub
(async function() {
  const host = await getMyHostname();
  server.listen(PORT, () => {
    console.log(`TestCafe-Hub running on http://${host}:${PORT}`);
  });
})();
