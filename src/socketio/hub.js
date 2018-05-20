module.exports = function(io, nodes) {
  io.of('/hub').on('connect', socket => {
    // Notify hub dashboard about node changes
    const emitNodes = () => socket.emit('nodes', nodes.getNodes());
    nodes.on('addNode', emitNodes);
    nodes.on('removeNode', emitNodes);
    emitNodes();
  });
};