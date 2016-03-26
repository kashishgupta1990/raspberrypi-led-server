var http = require('http');

var server = http.createServer(function(request,response){
    response.end('yoyooy');
});

server.listen(8000,function(){
    console.log('Server listening on 8000');
});