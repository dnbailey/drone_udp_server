const dgram = require("dgram");
const response = require("./response.js");

// Create a new UPD socket instance
const droneCommands = dgram.createSocket("udp4");

// Handle messages sent to server
droneCommands.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  // Send response
  droneCommands.send(
    Buffer.from(response.getResponse(msg)),
    rinfo.port,
    rinfo.address
  );
});

// Handle errors
droneCommands.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  droneCommands.close();
});

// Log that server is active
droneCommands.on("listening", () => {
  const address = droneCommands.address();
  console.log(
    `Server listening on ${address.address}:${address.port}\n--------------------------------\n`
  );
});

// Method to start the server
const listen = (port, address) => {
  droneCommands.bind({
    address: address,
    port: port,
    exclusive: true,
  });
};

exports.listen = listen;
