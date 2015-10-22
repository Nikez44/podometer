/**
 * Created by USER on 15/10/2015.
 */
var watchID = null;

var steps = 0;
var calories = 0;
var distance = 0;

var prevX = 0;
var prevY = 0;
var prevZ = 0;

var currX = 0;
var currY = 0;
var currZ = 0;

var moveX = false;
var moveY = false;
var isNoise = true;

var NOISE = 2.5;

function startWatch(){
    steps = 0;
    calories = 0;
    distance = 0;
    var options = { frequency: 1000 };
    watchID = navigator.accelerometer.watchAcceleration(onSucess, onError, options);
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

    if (Math.abs(currX) > NOISE && Math.abs(currY) > NOISE){
        isNoise = false;
    }else{
        isNoise = true;
    }

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

    if (moveX && moveY && !isNoise){
        steps++;
        //Suponiendo que le persona pesa aproximadamente 72 kg y lleva una velocidad de 4 km/h
        calories += 0.039;
        //Tomando del largo de paso promedio segun La Universidad Estadounidense de la Medicina Deportiva
        distance += 0.8;
    }

    $('#steps').html(steps);
    $('#calories').html(calories.toFixed(2));
    $('#distance').html(distance.toFixed(2));
}

function onError(){
    alert('¡Error!');
}