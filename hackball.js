var listener = require('./listener');

var pin22 = listener({ pin: 22 });

pin22.on('change', function() {
	console.log('pin 22 changed');
});
