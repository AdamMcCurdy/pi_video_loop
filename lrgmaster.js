/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector');
var secondsToWait = 10;
var moviePlaying = "madmax.mp4";


function playMovie(filename){
    omx.stop(function(){
        omx.play(filename, {loop: true});
    });

    moviePlaying = filename;
}

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
