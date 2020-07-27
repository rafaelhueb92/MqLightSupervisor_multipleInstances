const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const Queue = require("./queue");
if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function (id) {
    Queue(id).listen("test","grouping");
  });
}
