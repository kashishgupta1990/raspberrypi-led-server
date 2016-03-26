var http = require('http');
var gpio = require("pi-gpio");

var GPIO = {
    init:function(){
        gpio.open(16, "output", function(err) {		// Open pin 16 for output
            if(err){
                throw err;
            }
        });
    },
    on:function(){
        GPIO.led(1)
    },
    off:function(){
        GPIO.led(0)
    },
    led:function(mode){
        gpio.write(16, mode, function() {			// Set pin 16 high (1)
            gpio.close(16);						// Close pin 16
        });
    }
};

http
    .createServer(function(request,response){
    switch(request.url){
        case "/led/on":
            console.log('Turn on led');
            GPIO.on();
            response.end('Turn on led');
            break;
        case "/led/off":
            console.log('Turn off led');
            GPIO.off();
            response.end('Turn off led');
            break;
        default:
            console.log('I dont know man');
            response.end('I dont know man');
    }
})
    .listen(8000,function(){
    console.log('Server listening on 8000');
});

