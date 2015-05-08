var gpio = require('rpi-gpio');
var util = require('util');
var events = require('events');

/**
 * Listen for a pin
 * @param {Object} config
 *                  - pin: pin to listen to
 *                  - interval: poll interval (ms)
 *                  - delay: how much time should pass before registering
 *                           another change (s)
 */
function Listener(config) {
  this.pin = config.pin;
  this.interval = config.interval || 10;
  this.delay = (config.delay * 1000) || 5000;

  events.EventEmitter.call(this);
  gpio.setup(this.pin, gpio.DIR_IN, this.read.bind(this));
}

util.inherits(Listener, events.EventEmitter);

Listener.prototype.read = function() {
  var _this = this;
  var prev = -1;
  var lastChanged = Date.now();

  setInterval(function () {
    gpio.read(_this.pin, function (err, val) {
      _this.emit('data', val);

      if (err) _this.emit('error', err);
      
		  // todo: broadcast change      
    });
  }, this.interval);
};


module.exports = function(pin) {
  return new Listener(pin);
};

