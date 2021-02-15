const dgram = require("dgram");
const drone_commands = dgram.createSocket("udp4"); // This creates a new UPD socket instance
const drone_state = dgram.createSocket("udp4");

const commands = ["command", "takeoff", "land", "stop"]; // List of commands available in SDK 2.0

// Handle messages sent to server
drone_commands.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  
  // Simple method to abstract the message sending
  const send_msg = (res) => drone_commands.send(Buffer.from(res), rinfo.port, rinfo.address);
  
  // Check message and send appropriate response
  if (msg.toString() === "wifi?" | msg.toString() === "battery?") {
    send_msg(`${Math.floor(Math.random() * 100)}/r/n`)
  } else if (commands.includes(msg.toString())) {
    send_msg("ok")
  } else {
    send_msg("unrecognized command")
  }
});

// Handle errors
drone_commands.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  drone_commands.close();
});


// Log that server is active
drone_commands.on("listening", () => {
  const address = drone_commands.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

// Start the server up on port 8889
drone_commands.bind({
  address: '0.0.0.0',
  port: 8889,
  exclusive: true,
});
