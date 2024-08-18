
// connect to web socket server
const videoUrl = "ws://localhost:8080";

const canvas = document.getElementById('videoCanvas');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');

const player = new JSMpeg.Player(videoUrl, { canvas: canvas });

// Event listeners for play and pause buttons
playButton.addEventListener('click', () => {
    player.play();
});

pauseButton.addEventListener('click', () => {
    player.pause();
});