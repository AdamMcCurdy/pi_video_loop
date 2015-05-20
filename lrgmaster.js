/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector')
 //, secondsToWait = 30
    , moviePlaying = 'farClip.mp4'
    , avgData = []
    , sampleSize = 25
    , sensorMin = 299;

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/tty.usbserial-MBY0W12V", { // mac version
//var serialPort = new SerialPort("/dev/ttyUSB0", { //pi version
    baudrate: 57600
});

function playMovie(filename){
    //omx.stop();
    //setTimeout(function(){
    //    omx.play(filename, {loop: true});
    //}, 500);

    moviePlaying = filename;
}
console.log("Playing " + moviePlaying);
//playMovie(moviePlaying);

serialPort.on("open", function () {
    console.log('open');
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
            console.log(average);
            if(data < 1500 && moviePlaying == 'farClip.mp4'){
                //omx play movie in ping pong fashion
                playMovie('nearClip.mp4');
                //send signal to other pi about playing next movie
            }
            if(data > 1500 && moviePlaying == 'nearClip.mp4'){
                playMovie('farClip.mp4');
            }
        }
    });
});