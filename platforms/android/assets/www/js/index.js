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

var ALPHA = 2;

function startWatch(){
    var options = { frequency: 500 };
    watchID = navigator.accelerometer.watchAcceleration(onSucess, onError, options);
}

function stopWatch(){
    if(watchID){
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

function onSucess(acceleration){

    $('#steps').html(steps);

    prevX = currX;
    prevY = currY;
    prevZ = currZ;

    $('#previous').html(' Aceleracion X:' + prevX + '<br/>' +
        ' Aceleracion Y:' + prevY + '<br/>' +
        ' Aceleracion Z:' + prevZ + '<br/>');

    currX = acceleration.x;
    currY = acceleration.y;
    currZ = acceleration.z;

    $('#current').html(' Aceleracion X:' + currX + '<br/>' +
        ' Aceleracion Y:' + currY + '<br/>' +
        ' Aceleracion Z:' + currZ + '<br/>');

    difX = Math.abs(currX - prevX);
    difY = Math.abs(currY - prevY);
    difZ = Math.abs(currZ - prevZ);

    $('#difX').html('Dif x: '+ difX);
    $('#difY').html('Dif y: '+ difY);
    $('#difZ').html('Dif z: '+ difZ);

    /*

    if (currX != (prevX + NOISE) || currX != (prevX - NOISE)){
        moveX = true;
    }

    if (currY != (prevY + NOISE) || currY != (prevY - NOISE)){
        moveY = true;
    }

    if (difX > ALPHA && difY > ALPHA){
        steps++;
    }*/

    if (difX > ALPHA && difX < ALPHA*2){
        moveX = true;
    }else{
        moveX =  false
    }

    if (difY >  ALPHA && difY < ALPHA*2){
        moveY = true;
    }else{
        moveY = false
    }

    if (moveX && moveY){
        steps++;
    }

}

function onError(){
    alert('¡Error!');
}