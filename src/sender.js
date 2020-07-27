const mqlight = require("mqlight");
const sendClient = mqlight.createClient({ service: "amqp://localhost" });

const topic = "test";
sendClient.on("started", function () {
  sendClient.send(topic, "Hello World!", function (err, data) {
    console.log("Sent: %s", data);
    sendClient.stop();
  });
});
