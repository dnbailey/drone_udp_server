const dgram = require("dgram");

// Create a new UPD socket instance
const droneState = dgram.createSocket("udp4");

const sendState = (port, address) => {
  console.log(`Server streaming on ${address}:${port}`);

  // Helper function for generating a random integer
  const randomInt = (max) => Math.floor(Math.random() * max);

  // Send drone state every 100ms
  setInterval(() => {
    //Generate random values for drone state
    const state = {
      pitch: randomInt(20),
      roll: randomInt(20),
      vgx: randomInt(20),
      vgy: randomInt(20),
      vgz: randomInt(20),
    };

    // Generate the string to stream
    const state_str = `pitch:${state.pitch};roll:${state.roll};vgx:${state.vgx};vgy:${state.vgy};vgz:${state.vgz};templ:30;temph:50;tof:0;h:0;bat:89;baro:2.9;time:0;agx:2.00;agy:2.00;agz:2.00;\r\n`;

    // Stream the drone state
    droneState.send(Buffer.from(state_str), port, address);
  }, 100);
};

exports.sendState = sendState;
