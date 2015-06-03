/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector')
    , usb = require('usb')
    , time = require('time')
    , timeToTrigger = 30
    , lastReading = 0
    , triggered = false
    , triggeredTime = 0
    , moviePlaying = 'trigger.mp4'
    , avgData = []
    , sampleSize = 25
    , sensorMin = 299
    , startDevices = [];

var SerialPort = require("serialport").SerialPort;
//var serialPort = new SerialPort("/dev/tty.usbserial-MBY0W12V", { // mac version
var serialPort = new SerialPort("/dev/ttyUSB0", { //pi version
    baudrate: 57600
});

//setInterval(sampleUSBReading, 1000);
setInterval(checkUSBReading, 500);

function checkUSBReading(){
    //check reading and also whether movie already playing
    if(lastReading < 1500 && triggered == false){

        //checking to see if current time is under 30 seconds
        if(time.time() - triggeredTime > timeToTrigger){
            console.log("Triggered");
            triggeredTime = time.time();
            console.log("Time = " + triggeredTime);
            triggered = true;
        }
        else{
            console.log("Too soon");
        }

    }
    //else if(lastReading > 4500){
    //    triggered = false;
    //    console.log("trigger reset");
    //}
    else{
        console.log(lastReading);
    }

    if(time.time() - triggeredTime > timeToTrigger && triggered == true){
        triggered = false;
        console.log("Trigger reset");
    }
}

function sampleUSBReading(){
    lastReading = Math.round(Math.random() * 5000);
    console.log(lastReading);
}
function loadMoviesFromDir(usbPath){

}
function inventoryUSBDevices(){

}

function playMovie(filename){
    omx.stop();
    setTimeout(function(){
        omx.play(filename, {loop: true});
    }, 500);

    moviePlaying = filename;
}
//console.log("Playing " + moviePlaying);

playMovie(moviePlaying);

serialPort.on("open", function () {
    //console.log('open');
    serialPort.on('data', function(data) {
        data = data.toString().split('R')[1];
        if(data > sensorMin){
            if(avgData.length >= sampleSize){
                //console.log("removing data");
                avgData.shift();
            }
            avgData.push(data);
            var sum = 0;
            for(var x = 0; x < avgData.length; x++){
                sum = sum + parseInt(avgData[x]);
            }

            var average = sum / avgData.length;
            average = Math.round(average);
            lastReading = average;
            //console.log(average);
            //console.log(data);
            //if(data < 1500 && moviePlaying == 'main.mp4'){
            //    //omx play movie in ping pong fashion
            //    playMovie('trigger.mp4');
            //    //send signal to other pi about playing next movie
            //}
            //if(data > 1500 && moviePlaying == 'nearClip.mp4'){
            //    playMovie('main.mp4');
            //}
        }
    });
});