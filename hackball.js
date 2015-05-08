var listener = require('pinhead');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var exec = require('child_process').exec;

var score = {red: 0 , blue: 0};

var red = listener({ pin: 22, delay: .5 });
var blue = listener({ pin: 11, delay: .5 });

red.on('change', function() {
	goal();
  score.red++;
});

blue.on('change', function() {
  goal();
  score.blue++;
});

function goal() {
  exec('omxplayer static/sound/goaal.mp3');
  io.emit('score', score);
}

// give new connections the latest score
io.on('connection', function (socket) {
  socket.emit('score', score);
});

app.use(express.static('static'));
server.listen(3000);