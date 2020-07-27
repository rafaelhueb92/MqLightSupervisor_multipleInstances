require("dotenv/config");
const mqlight = require("mqlight");

class Queue {
  constructor(pId) {
    try {
      this.pId = pId;
      const url = `amqp://localhost:${process.env.QUEUEPORT}`;
      this.recvClient = mqlight.createClient(
        {
          service: url,
        },
        () => console.log(`${pId} está conectado a fila`)
      );
    } catch (ex) {
      console.error("Err Queue Constructor", ex);
    }
  }

  listen(topicPattern, shared) {
    const pId = this.pId;
    this.recvClient.subscribe(topicPattern, shared);
    this.recvClient.on("message", function (data, delivery) {
      console.log("Cpu", pId);
      console.log("Recv: %s", data);
    });
  }
}

module.exports = (pId) => new Queue(pId);
