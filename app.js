// Require dependency
var http = require('http');
var gpio = require('pi-gpio');
var SERVER_PORT = 8000;

// Raspberry Pi Constants
var GPIO_PIN = {
    ELEVEN: 11
};
var PIN_STATE = {
    ON: 1,
    OFF: 0
};

// Raspberry Pi GPIO basic setup
gpio.open(GPIO_PIN.ELEVEN, "output", function (err) {		// Open pin 16 for output
    if (err) {
        throw err;
    }
    startHttpServer();
});

// Raspberry Pi LED Methods with LED namespace
var LED = {
    on: function () {
        gpio.write(GPIO_PIN.ELEVEN, PIN_STATE.ON, function () {
        });
    },
    off: function () {
        gpio.write(GPIO_PIN.ELEVEN, PIN_STATE.OFF, function () {
        });
    },
    state: function (callback) {
        gpio.read(GPIO_PIN.ELEVEN, callback);
    }
};

var closeAllPins = function () {
    gpio.close(GPIO_PIN.ELEVEN, function () {
        console.log('Pin successfully closed');
        process.exit();
    });
};

// Server Methods
var setResponseHeader = function (response, objectData) {
    var json;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, {"Content-Type": "application/json"});
    try {
        json = JSON.stringify(objectData);
    } catch (e) {
        json = {
            error: e
        }
    }
    return response.end(json);
};

var startHttpServer = function () {
    http
        .createServer(function (request, response) {

            switch (request.url) {
                case "/led/on":
                    console.log('Led On');
                    LED.on();
                    setResponseHeader(response, {status: 'Led On'});
                    break;
                case "/led/off":
                    console.log('Led Off');
                    LED.off();
                    setResponseHeader(response, {status: 'Led Off'});
                    break;
                case "/led/state":
                    console.log('Status');
                    LED.state(function (err, value) {
                        if (err) {
                            response.end('Some error occure', err);
                        } else {
                            if (value == 1) {
                                setResponseHeader(response, {status: 'ON'});
                            } else {
                                setResponseHeader(response, {status: 'OFF'});
                            }
                        }
                    });
                    break;
                default:
                    setResponseHeader(response, {status: 'Invalid API'});
            }
        })
        .listen(SERVER_PORT, function () {
            console.log('Server listening on ' + SERVER_PORT);
        });
};

// Close all open pin when process exit
process.on('SIGINT', function () {
    console.log('Ctrl+C');
    closeAllPins();
});