// List of commands available in SDK 2.0
const commandList = [
  { command: "command" },
  { command: "takeoff" },
  { command: "land" },
  { command: "stop" },
  { command: "emergency" },
  { command: "streamon" },
  { command: "streamoff" },
  { command: "right", range: { min: 20, max: 500 } },
  { command: "left", range: { min: 20, max: 500 } },
  { command: "up", range: { min: 20, max: 500 } },
  { command: "down", range: { min: 20, max: 500 } },
  { command: "forward", range: { min: 20, max: 500 } },
  { command: "back", range: { min: 20, max: 500 } },
  { command: "cw", range: { min: 1, max: 360 } },
  { command: "ccw", range: { min: 1, max: 360 } },
  { command: "flip", options: ["l", "r", "f", "b"] },
];

// Generate a response based on incoming message
const response = (msg) => {
  // Parse the msg recieved
  const command = msg.toString();
  const commandRoot = command.split(" ")[0];
  const commandArg = command.split(" ")[1];

  commandRes = commandList.find(({ command }) => command === commandRoot);

  // Deal with non-commands
  if (!commandRes) return "unrecongnized command";

  // Check if argument supplied if required
  if ((commandRes.range || commandRes.options) && commandArg === undefined) {
    return "argument required";
  }

  // Check for input range
  if (
    commandRes.range &&
    (commandArg < commandRes.range.min || commandArg > commandRes.range.max)
  ) {
    return "out of range";
  }

  // Check for options
  if (commandRes.options && !commandRes.options.includes(commandArg)) {
    return "not an option";
  }

  return "ok";
};

exports.getResponse = response;
