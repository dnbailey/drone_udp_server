const commands = require("./src/commands");
const state = require("./src/state");

const ADDRESS = "0.0.0.0";
const COMMAND_PORT = 8889;
const STATE_PORT = 8890;

// Start the servers
commands.listen(COMMAND_PORT, ADDRESS);
state.sendState(STATE_PORT, ADDRESS);
