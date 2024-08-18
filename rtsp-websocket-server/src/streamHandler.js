// src/streamHandler.js
const { spawn } = require("child_process");
const config = require("../config/config");

function handleStream(socket) {
  // Start an FFmpeg process to handle the RTSP stream
  const ffmpeg = spawn("ffmpeg", [
    "-i", config.rtspUrl,           // Input RTSP stream URL from config
    "-f", "mpegts",                 // Output format: MPEG-TS
    "-codec:v", "mpeg1video",       // Video codec: MPEG-1
    "-s", "640x480",                // Video resolution: 640x480
    "-b:v", "800k",                 // Video bitrate: 800 kbps
    "-r", "30",                     // Frame rate: 30 fps
    "-codec:a", "mp2",              // Audio codec: MP2
    "-b:a", "128k",                 // Audio bitrate: 128 kbps
    "-ar", "44100",                 // Audio sampling rate: 44100 Hz
    "-ac", "1",                     // Audio channels: Mono
    "-f", "mpegts",                 // Output format: MPEG-TS
    "-",                            // Output to stdout (pipe to WebSocket)
  ]);

  // Pipe FFmpeg's stdout (video stream) to the WebSocket client
  ffmpeg.stdout.on("data", (data) => {
    socket.send(data);
  });

  // Handle FFmpeg errors
  ffmpeg.stderr.on("data", (data) => {
    console.error(`FFmpeg error: ${data}`);
  });

  // When the FFmpeg process exits, close the WebSocket connection
  ffmpeg.on("close", (code) => {
    console.log(`FFmpeg process exited with code ${code}`);
    socket.close();
  });

  // When the WebSocket client disconnects, kill the FFmpeg process
  socket.on("close", () => {
    console.log("Client disconnected");
    ffmpeg.kill("SIGINT");
  });
}

module.exports = handleStream;
