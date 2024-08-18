# Video Streaming Application

This project demonstrates a video streaming setup with a frontend web application, a backend WebSocket server, and a simple RTSP server. The application streams video content from an RTSP server to a web client using WebSockets.

## Project Structure

- **Frontend:** HTML and JavaScript for displaying the video stream in a web browser.
- **Backend:** WebSocket server with a `handleStream` function that processes and forwards video data.
- **RTSP Server:** Simple RTSP server setup for streaming video content.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for running the backend server)
- [FFmpeg](https://ffmpeg.org/) (for processing and streaming video)
- [rtsp-simple-server](https://github.com/aler9/rtsp-simple-server) (for the RTSP server)
- [Docker](https://www.docker.com/) (for the RTSP server)

### Setup and Installation
1. Clone the Repository
2. Install Dependencies on the backend:
```cd ./rtsp-websocket-server```
```npm install```
3. Set Up the RTSP Server:
```docker run --rm -it -e RTSP_PROTOCOLS=tcp -p 8554:8554 -p 1935:1935 -p 8888:8888 aler9/rtsp-simple-server```
```ffmpeg -stream_loop -1 -re -i ~/Downloads/test.mp4 -c:v libx264 -c:a aac -f rtsp rtsp://localhost:8554/mystream```
Note: change the file path name to your local video file
4. Run the backend web socket server:
    ```node src/server.js```
5. Open the html file in the browser

