const EventEmitter = require('events');

class Nodes extends EventEmitter {
  constructor() {
    super();
    this.nodes = new Map();
    this.jobs = new Map();
  };

  getNodes() {
    return [...this.nodes.values()].map(node => node.getData());
  }

  addNode(key, nodeData) {
    this.nodes.set(key, nodeData);
    this.emit('addNode', nodeData);
  }

  removeNode(key) {
    const nodeData = this.nodes.get(key);
    this.nodes.delete(key);
    this.emit('removeNode', nodeData);
  }

  getNodeByName(name) {
    return [...this.nodes.values()].find(node => node.matchesName(name));
  }

  addJob(id, url, name) {
    const node = this.getNodeByName(name);
    if(!node) throw new Error(`No node for "${name}" found.`);
    const job = {id, url, name, node};
    this.jobs.set(id, job);

    // TODO: remove staled job after timeout

    this.emit('addJob', job);
    return job;
  }

  removeJob(id) {
    const job = this.jobs.get(id);
    this.jobs.delete(id);
    this.emit('removeJob', job);
  }

  getJobById(id) {
    return this.jobs.get(id);
  }
}

module.exports = new Nodes();