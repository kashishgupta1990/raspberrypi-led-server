var http = require('http');
var gpio = require('pi-gpio');

// GPIO basic setup
var GPIO_PIN = {
  SIXTEEN:16  
};

var PIN_STATE={
    ON:1,
    OFF:0
};

gpio.open(GPIO_PIN.SIXTEEN, "output", function(err) {		// Open pin 16 for output
    if(err){
        throw err;
    }

    startHttpServer();
});

function closeAllPins(){
    gpio.close(GPIO_PIN.SIXTEEN);
}

var LED = {
    on:function(){
        gpio.write(GPIO_PIN.SIXTEEN, PIN_STATE.ON, function() {});
        
    },
    off:function(){
        gpio.write(GPIO_PIN.SIXTEEN, PIN_STATE.OFF, function() {});
    },
    state:function(callback){
        gpio.read(GPIO_PIN.SIXTEEN, callback);
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
                case "/led/state":
                    console.log('Turn off led');
                    LED.state(function(err,value){
                       if(err){
                           response.end('Some error occure');
                       } else{
                           if(value==1){
                               response.end('ON');
                           }else {
                               response.end('OFF');
                           }
                       }
                    });
                    break;
                default:
                    console.log('I dont know man');
                    response.end('I dont know man');
            }
        })
        .listen(8000, function () {
            console.log('Server listening on 8000');
        })
        .on('close', function() {
            closeAllPins();
            console.log('Http Serve Closed');
         });
}