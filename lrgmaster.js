/**
 * Created by Adam on 5/13/15.
 * TODO: List ports and parse through them for usb stick and sensor
 * TODO: play usb files instead of local ones
 */


var   omx = require('omxdirector')
    , time = require('time')
    , usb = require('usb')
    , timeToTrigger = 30
    , lastReading = 5000
    , triggered = false
    , triggeredTime = 0
    , moviePlaying = 'trigger.mp4'
    , minSensorRange = 501
    , maxSensorRange = 3000;

var port = require("serialport");
var SerialPort = port.SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", { //pi version
    baudrate: 57600
});

function clearScreen(){
    //console.log(" ");
}
function checkUSBReading(){
    //check reading and also whether movie already playing
    if(lastReading < maxSensorRange && lastReading > minSensorRange && triggered == false){
        //checking to see if current time is under 30 seconds
        if(time.time() - triggeredTime > timeToTrigger){
            playMovie("trigger.mp4");
            //console.log("Triggered");
            triggeredTime = time.time();
            //console.log("Time = " + triggeredTime);
            triggered = true;
        }
    }

    if(time.time() - triggeredTime > timeToTrigger && triggered == true){
        triggered = false;
        //console.log("Trigger reset");
        playMovie("attract.mp4");
    }
}


function playMovie(filename){
    //omx.stop();
    //setTimeout(function(){
    //    omx.play(filename, {loop: true});
    //}, 750);
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

console.log(usb.getDeviceList());

init();

setInterval(checkUSBReading, 500);
setInterval(clearScreen, 10);
