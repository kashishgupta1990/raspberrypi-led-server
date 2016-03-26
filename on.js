var gpio = require('rpi-gpio');

gpio.setup(16, gpio.DIR_OUT, write);

function write() {
    gpio.write(16, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}