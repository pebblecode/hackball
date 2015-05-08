var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var exec = require('child_process').exec;

var Game = require('./game');
var match = new Game('red', 'blue');

match.init().then(function () {
  app.use(express.static('static'));
  server.listen(3000);
});

// give new connections the latest score
io.on('connection', function (socket) {
  socket.emit('score', score);
});

