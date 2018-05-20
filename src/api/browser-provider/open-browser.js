module.exports = function(nodes) {
  return async function(req, res) {
    const {id, url, name} = req.body;

    if(!id || !url || !name) {
      res.status(400).send('Content-Body must be JSON with id,name,url properties.');
      return;
    }

    let job;
    
    try {
      job = nodes.addJob(id, url, name);
    } catch(e) {
      res.status(400).send(e.message);
      return;
    }

    try {
      await job.node.openBrowser(id, url);
    } catch(e) {
      nodes.removeJob(id);
      res.status(500).send(e.message);
      return;
    }

    res.json('ok');
  };
};