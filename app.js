var http = require('http');
var gpio = require('pi-gpio');

// GPIO basic setup
var GPIO_PIN = {
  SIXTEEN:16  
};
gpio.open(GPIO_PIN.SIXTEEN, "output", function(err) {		// Open pin 16 for output
    if(err){
        throw err;
    }

    startHttpServer();
});

var LED = {
    on:function(){
        gpio.read(GPIO_PIN.SIXTEEN, function(err, value) {
            if(err) throw err;
            if(value == 0){
                gpio.write(GPIO_PIN.SIXTEEN, 1, function() {});
            }
        });
    },
    off:function(){
        gpio.read(GPIO_PIN.SIXTEEN, function(err, value) {
            if(err) throw err;
            if(value == 1){
                gpio.close(GPIO_PIN.SIXTEEN);
            }
        });
    }
};

function startHttpServer() {
    http
        .createServer(function (request, response) {
            switch (request.url) {
                case "/led/on":
                    console.log('Turn on led');
                    LED.on();
                    response.end('Turn on led');
                    break;
                case "/led/off":
                    console.log('Turn off led');
                    LED.off();
                    response.end('Turn off led');
                    break;
                default:
                    console.log('I dont know man');
                    response.end('I dont know man');
            }
        })
        .listen(8000, function () {
            console.log('Server listening on 8000');
        });
}
