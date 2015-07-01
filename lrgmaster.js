/**
 * Created by Adam on 5/13/15.
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
    , maxSensorRange = 3000
    , usbPath = "../../../media/usb0/";

//var port = require("serialport");
//var SerialPort = port.SerialPort;

//var serialPort = new SerialPort("/dev/ttyUSB0", { //pi version
//    baudrate: 57600
//});

function clearScreen(){
    console.log(" ");
}
//function checkUSBReading(){
//    //check reading and also whether movie already playing
//    if(lastReading < maxSensorRange && lastReading > minSensorRange && triggered == false){
//        //checking to see if current time is under 30 seconds
//        if(time.time() - triggeredTime > timeToTrigger){
//            playMovie("trigger.mp4");
//            //console.log("Triggered");
//            triggeredTime = time.time();
//            //console.log("Time = " + triggeredTime);
//            triggered = true;
//        }
//    }
//
//    if(time.time() - triggeredTime > timeToTrigger && triggered == true){
//        triggered = false;
//        //console.log("Trigger reset");
//        playMovie("attract.mp4");
//    }
//}

//
//function playMovie(filename){
//    omx.stop();
//    setTimeout(function(){
//        if (filename != 'attract.mp4') {
//            omx.play(usbPath + filename, {loop: false});
//            setTimeout(function () {
//                omx.stop();
//                setTimeout(function(){
//                    omx.play(usbPath + 'trigger.mp4', {loop:false});
//                }, 750);
//                omx.play(usbPath + 'attract.mp4', {loop: true});
//                triggered = false;
//            }, 4000);
//        } else {
//            omx.play(usbPath + filename, {loop: true});
//        }
//    }, 750);
//
//    moviePlaying = filename;
//}

function init(){
    omx.play(usbPath + "attract.mp4", {loop:true});
    triggered = false;
}

//function fakeUSBReading() {
//    lastReading = (Math.random() * 5000);
//}
//serialPort.on("open", function () {
//    //console.log('open');
//    serialPort.on('data', function(data) {
//        data = data.toString().split('R')[1];
//        if(data > minSensorRange){
//            lastReading = data;
//        }
//    });
//});

init();

//setInterval(fakeUSBReading, 400);
//setInterval(checkUSBReading, 500);
setInterval(clearScreen, 10);
