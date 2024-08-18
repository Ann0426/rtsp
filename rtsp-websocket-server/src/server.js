const http = require('http');
const websocketServer = require('./websocketServer');
const config = require('../config/config');

const server = http.createServer((req, res) => {
  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(8081, () => {
  console.log('HTTP server for status checks running on port 8081');
});

websocketServer.start(config.websocketPort);