/**
 * Created by Joshua on 21/10/2015.
 */
var gWatchID = null;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    startWatchCompass();
}

function startWatchCompass() {
    var options = { frequency: 500 };
    if (!gWatchID) {
        gWatchID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
    }
}

function stopWatchCompass() {
    if (gWatchID) {
        navigator.compass.clearWatch(watchID);
        gWatchID = null;
    }
}

function onCompassSuccess(heading) {
    var element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading + '<br>';

    var direction = heading.magneticHeading;

    var img = document.getElementById('image');
    img.style.margin = 'auto';
    img.style.transformOrigin = '50% 50%';
    img.style.webkitTransformOrigin = '50% 50%';
    img.style.msTransformOrigin = '50% 50%';

    img.style.webkitTransform = 'rotate('+(-direction)+'deg)';
    img.style.mozTransform    = 'rotate('+(-direction)+'deg)';
    img.style.msTransform     = 'rotate('+(-direction)+'deg)';
    img.style.oTransform      = 'rotate('+(-direction)+'deg)';
    img.style.transform       = 'rotate('+(-direction)+'deg)';

    if (direction>0 && direction<90){
        element.innerHTML = 'Direction: Noreste (NE)';
    }
    if (direction == 90){
        element.innerHTML = 'Direction: Este (E)';
    }
    if (direction>90 && direction<180){
        element.innerHTML = 'Direction: Sureste (SE)';
    }
    if (direction == 180){
        element.innerHTML = 'Direction: Sur (S)';
    }
    if (direction>180 && direction<270){
        element.innerHTML = 'Direction: Suroeste (SO)';
    }
    if (direction == 270){
        element.innerHTML = 'Direction: Oeste (O)';
    }
    if (direction>270 && direction<359){
        element.innerHTML = 'Direction: Noroeste (NO)';
    }
    if (direction == 359){
        element.innerHTML = 'Direction: Norte (N)';
    }
}
function onCompassError(compassError) {
    alert('Compass error: ' + compassError.code);
}