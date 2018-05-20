const useragent = require('useragent');
const Node = require('../Node');

module.exports = function(io, nodes) {

  io.of('/nodes').on('connect', socket => {
    const req = socket.request;

    // TODO: make overwritable from query params
    const ua = useragent.parse(req.headers['user-agent']);
    const browser = ua.family;
    const browserVersion = `${ua.major}.${ua.minor}.${ua.patch}`;
    const os = ua.os.family;
    const osVersion = `${ua.os.major}.${ua.os.minor}.${ua.os.patch}`;
    const canResize = false;
    const canTakeScreenshot = false;
    const maxInstances = Number.MAX_SAFE_INTEGER;

    const nodeData = {
      socket,
      name: `${browser}@${browserVersion}:${os} ${osVersion}`,
      browser,
      browserVersion,
      os,
      osVersion,
      address: req.client.remoteAddress,
      canResize,
      canTakeScreenshot,
      maxInstances
    };
    nodes.addNode(socket, new Node(nodeData));

    console.log('Node connected:', nodeData.name, 'from', nodeData.address);

    socket.on('disconnect', () => {
      console.log('Node disconnected:', nodeData.name, 'from', nodeData.address);
      nodes.removeNode(socket);
    })
  });

};