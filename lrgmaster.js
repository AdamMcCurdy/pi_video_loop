/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector')
 //, secondsToWait = 30
 , moviePlaying = 'madmax.mp4';

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 57600
});

function playMovie(filename){
    omx.stop();
    setTimeout(function(){
        omx.play(filename, {loop: true});
    }, 500);

    moviePlaying = filename;
}

playMovie(moviePlaying);

//setInterval(function() {
//        if(moviePlaying == 'madmax.mp4'){
//            //omx play movie in ping pong fashion
//            playMovie('avengers.mp4');
//            //send signal to other pi about playing next movie
//        }
//        else if(moviePlaying == 'avengers.mp4'){
//            playMovie('madmax.mp4');
//        }
//    }, secondsToWait * 1000
//);

serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function(data) {
        console.log('data received: ' + data);
    });
});