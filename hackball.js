var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var exec = require('child_process').exec;

var Game = require('./game');
var match = new Game('red', 'blue');

match.init().then(function () {
  console.log('ready');
});

match.on('goal', function(team) {
	console.log(match.summary());
	io.emit('score', match.summary());
});

// give new connections the latest score
io.on('connection', function (socket) {
  socket.emit('score', match.summary());
});

app.get('/', function(req, res) {
  if (!match.started) {
    return res.sendFile(__dirname + '/static/gamestart.html');
  }
  return res.sendFile(__dirname + '/static/index.html');
});

app.get('/start', function (req, res) {
  match.start();
  res.redirect('/');
});


app.get('/reset', function (res, res) {
	match.reset();
});

app.use(express.static('static'));
server.listen(3000);
