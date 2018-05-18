const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/api/remoteCount', function(req, res) {
  res.send(Object.keys(io.sockets.connected).length.toString());
});

app.post('/api/run', function(req, res) {
  const {url} = req.body;
  io.emit('run', {url});
  console.log(`Emitted run for ${url}`);
  res.send('OK');
});

app.post('/api/completed', function(req, res) {
  const {url} = req.body;
  io.emit('completed', {url});
  console.log(`Emitted completed for ${url}`);
  res.send('OK');
});

io.on('connect', socket => console.log('Client connected'));
io.on('disconnect', socket => console.log('Client disconnected'));

server.listen(PORT, () => {
  console.log(`TestCafe-Hub running on port ${PORT}`);
});