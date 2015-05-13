/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector');
var secondsToWait = 30;
var moviePlaying = "madmax.mp4";


function playMovie(filename){
    omx.stop();
    setTimeout(function(){
        omx.start(filename, {loop: true});
    }, 500);
    moviePlaying = filename;
}

omx.play(moviePlaying, {loop: true});

setInterval(function() {
        if(moviePlaying == 'madmax.mp4'){
            //omx play movie in ping pong fashion
            playMovie('avengers.mp4');
            //send signal to other pi about playing next movie
        }
        else if(moviePlaying == 'avengers'){
            playMovie('madmax.mp4');
        }
    }, secondsToWait * 1000
);
