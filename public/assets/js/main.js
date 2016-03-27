$( document ).ready(function() {
    var baseUrl = 'http://192.168.0.199:8000/';
    var ledImgTag = $('#ledImage');
    var LED = {
      on:function(){
          ledImgTag.src = "assets/img/pic_bulbon.gif";
      },
        off:function(){
            ledImgTag.src = "assets/img/pic_bulboff.gif";
        }
    };
    var API = {
        checkStatus:function(callback){
            $.get( baseUrl + "led/state")
                .done(function(result){
                    callback(null,result);
                })
                .fail(function(error){
                    callback(error,null);
                });
        },
        switchOnLed:function(callback){
            $.get( baseUrl + "led/on")
                .done(function(result){
                    callback(null,result);
                })
                .fail(function(error){
                    callback(error,null);
                });
        },
        switchOffLed:function(callback){
            $.get( baseUrl + "led/off")
                .done(function(result){
                    callback(null,result);
                })
                .fail(function(error){
                    callback(error,null);
                });
        }
    };

    API.checkStatus(function(err,result){
        if(err){
            console.error(err);
        }else{
            result=="ON"?LED.on():LED.off();
        }
    });

    window.changeImage = function(){
        API.checkStatus(function(err,result){
            if(err){
                console.error(err);
            }else{
                if(result=="ON"){
                    API.switchOffLed(function(err,data){
                        if(err){
                            console.error(err);
                        }else{
                            if(data == "Led Off"){
                                LED.off();
                            }
                        }
                    })
                }else{
                    API.switchOnLed(function(err,data){
                        if(err){
                            console.error(err);
                        }else{
                            if(data == "Led On"){
                                LED.on();
                            }
                        }
                    })
                }
            }
        })
    };
});