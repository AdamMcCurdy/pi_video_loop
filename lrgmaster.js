/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector')
    , time = require('time')
    , timeToTrigger = 30
    , lastReading = 5000
    , triggered = false
    , triggeredTime = 0
    , moviePlaying = 'trigger.mp4'
    , minSensorRange = 299
    , maxSensorRange = 3000;

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", { //pi version
    baudrate: 57600
});

setInterval(checkUSBReading, 500);

function checkUSBReading(){
    //check reading and also whether movie already playing
    if(lastReading < maxSensorRange && lastReading > minSensorRange && triggered == false){
        //checking to see if current time is under 30 seconds
        if(time.time() - triggeredTime > timeToTrigger){
            playMovie("trigger.mp4");
            console.log("Triggered");
            triggeredTime = time.time();
            console.log("Time = " + triggeredTime);
            triggered = true;
        }
        else{
            console.log("Too soon");
        }

    }
    else{
        console.log(lastReading);
    }

    if(time.time() - triggeredTime > timeToTrigger && triggered == true){
        triggered = false;
        console.log("Trigger reset");
        playMovie("attract.mp4");
    }
}


function playMovie(filename){
    omx.stop();

    setTimeout(function(){
        omx.play(filename, {loop: true});
    }, 750);

    moviePlaying = filename;
}

function init(){
    omx.play("attract.mp4", {loop:true});
    triggered = false;
}

serialPort.on("open", function () {
    //console.log('open');
    serialPort.on('data', function(data) {
        data = data.toString().split('R')[1];
        if(data > minSensorRange){
            lastReading = data;
        }
    });
});

init();