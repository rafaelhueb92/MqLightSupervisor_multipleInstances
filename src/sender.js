const mqlight = require("mqlight");
const sendClient = mqlight.createClient({ service: "amqp://localhost" });

const topic = "test";
sendClient.on("started", function () {
  for (let i = 0; i <= 100; i++) {
    sendClient.send(topic, `Sending message ${i}`, function (err, data) {
      console.log("Sent: %s", data);
    });
  }

  sendClient.stop();
});
