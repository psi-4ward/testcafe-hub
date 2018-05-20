module.exports = function(nodes) {
  return async function(req, res) {
    const {id, width, height} = req.body;

    if(!id) {
      res.status(400).send('Content-Body must be JSON with id,width,height properties.');
      return;
    }

    const job = nodes.getJobById(id);

    if(!job) {
      res.status(400).send(`No job for ID:${id} found`);
      return
    }

    try {
      res.json(await job.node.resizeWindow(width, height));
    }
    catch(e) {
      res.status(500).send(e.message);
    }
  };
};