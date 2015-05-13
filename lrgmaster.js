/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxdirector');
var secondsToWait = 30;
var moviePlaying = "madmax";

setInterval(function() {
 	if(moviePlaying == 'madmax'){
		//omx play movie in ping pong fashion
		omx.stop();
		omx.start('avengers.mp4', {loop: true});
       		moviePlaying = 'avengers';
		//send signal to other pi about playing next movie
	}
	else if(moviePlaying == 'avengers'){
		omx.stop();
		omx.start('madmax.mp4', {loop: true});
		moviePlaying = 'madmax';
	}
    }, secondsToWait * 1000
)
