/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector')
 //, secondsToWait = 30
 , moviePlaying = 'farClip.mp4';

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/tty.usbserial-MBY0W0XV", {
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
        data = data.toString().split('R')[1];
        if(data > 299){
            console.log('data received: ' + data/1000);
            if(data < 1.5){
                if(moviePlaying == 'farClip.mp4') {
                    //omx play movie in ping pong fashion
                    playMovie('nearClip.mp4');
                    //send signal to other pi about playing next movie
                }
            }
        }
    });
});