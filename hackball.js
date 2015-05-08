var gpio = require('rpi-gpio');
var pins = [15, 16];

pins.forEach(function (pin) {
  gpio.setup(pin);
});

gpio.on('change', function (channel, value) {
	console.log('Channel ' + channel + ' value is now ' + value);
});

