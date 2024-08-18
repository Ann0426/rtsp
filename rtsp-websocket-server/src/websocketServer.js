const WebSocket = require("ws");
const handleStream = require("./streamHandler");

function start(port) {
  const server = new WebSocket.Server({ port });
  server.on("connection", (socket) => {
    console.log("Client connected");

    handleStream(socket);
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}

module.exports = { start };
