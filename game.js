var pinhead = require('pinhead');
var Q = require('q');
var util = require('util');
var events = require('events');

function Team(name, pin, game) {
  var _this = this;

  this.name = name;
  this.pin = pinhead({ pin: pin, delay: .5 });
  this.score = 0;

  this.pin.on('ready', function() {
    _this.ready = true;
  });

  this.pin.on('change', function() {
    _this.score++;
    game.emit('goal', _this);
  });
}

function Game(player1, player2) {
  this.playing = false;
  this.teams = [
    new Team(player1, 22, this),
    new Team(player2, 11, this)
  ];
  events.EventEmitter.call(this);
}

util.inherits(Game, events.EventEmitter);

Game.prototype.init = function() {
  return Q.Promise(function (resolve) {
    setInterval(function () {
      if (this.teams.every(function (team) { return team.ready; })) {
        resolve();
      }
    }, 100);
  });
};

Game.prototype.restart = function() {
  this.teams.forEach(function (team) {
    team.score = 0;
  });
};

module.exports = Game;