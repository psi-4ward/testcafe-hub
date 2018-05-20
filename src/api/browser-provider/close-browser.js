module.exports = function(nodes) {
  return async function(req, res) {
    const {id} = req.body;

    if(!id) {
      res.status(400).send('Content-Body must be JSON with id property.');
      return;
    }

    const job = nodes.getJobById(id);

    if(!job) {
      res.status(400).send(`No job for ID:${id} found`);
      return
    }

    try {
      await job.node.closeBrowser(id);
      nodes.removeJob(id);
    }
    catch(e) {
      res.status(500).send(e.message);
      return;
    }

    res.json('ok');
  };
};