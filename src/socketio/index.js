const socketio = require('socket.io');

const nodes = require('../nodes');
const ioNodeNamespace = require('./nodes');
const ioHubNamespace = require('./hub');

module.exports = function(server) {
  const io = socketio(server);

  ioNodeNamespace(io, nodes);
  ioHubNamespace(io, nodes);

  return io;
};
