/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxcontrol');
var secondsToWait = 10;
var moviePlaying = "madmax";

setInterval(function() {
 	if(moviePlaying == 'madmax'){
		//omx play movie in ping pong fashion
		omx.quit();
		omx.start('avengers.mp4');
       		moviePlaying = 'avengers';
		//send signal to other pi about playing next movie
	}
	else if(moviePlaying == 'avengers'){
		omx.quit();
		omx.start('madmax.mp4');
		moviePlaying = 'madmax';
	}
    }, secondsToWait * 1000
)
