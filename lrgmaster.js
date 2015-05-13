/**
 * Created by Adam on 5/13/15.
 */
var omx = require('omxcontrol');
var secondsToWait = 5;

setInterval(function() {
        console.log('test');
        //omx play movie in ping pong fashion
        //send signal to other pi about playing next movie
    }, secondsToWait * 1000
)