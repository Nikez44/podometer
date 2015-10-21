/**
 * Created by USER on 15/10/2015.
 */
var watchID = null;

var steps = 0;

var prevX = 0;
var prevY = 0;
var prevZ = 0;

var currX = 0;
var currY = 0;
var currZ = 0;

var moveX = false;
var moveY = false;

function startWatch(){
    var options = { frequency: 750 };
    watchID = navigator.accelerometer.watchAcceleration(onSucess, onError, options);
}

function stopWatch(){
    if(watchID){
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

function onSucess(acceleration){

    prevX = currX;
    prevY = currY;
    prevZ = currZ;

    currX = acceleration.x;
    currY = acceleration.y;
    currZ = acceleration.z;

    difX = Math.abs(currX - prevX);
    difY = Math.abs(currY - prevY);


    if (difX > 1.5){
        moveX = true;
    }else{
        moveX =  false
    }

    if (difY > 1 ){
        moveY = true;
    }else{
        moveY = false
    }

    if (moveX && moveY){
        steps++;
    }

    $('#steps').html(steps);
}

function onError(){
    alert('¡Error!');
}