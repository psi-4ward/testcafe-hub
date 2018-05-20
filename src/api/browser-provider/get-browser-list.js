module.exports = function(nodes) {
  return function(req, res) {
    res.json(nodes.getNodes());
  };
};