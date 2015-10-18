/**
 * Created by Kev' on 17/10/2015.
 */


var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function onFail(message) {

}

function onPhotoDataSuccess(imageData) {

    var smallImage = document.getElementById('Image1');

    smallImage.src =  imageData;

}

function onPhotoURISuccess(imageURI) {

    var largeImage = document.getElementById('Image1');

    largeImage.src = imageURI;
}

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}


function getPhotoFromLibrary() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.PHOTOLIBRARY });
}

function onPrompt1(buttonIndex) {

    if(buttonIndex == 1){
        showPrompt();
    }
}

function onPrompt2(buttonIndex) {
    if(buttonIndex == 1){
        capturePhoto();
    }

    if(buttonIndex == 2){
        getPhotoFromLibrary();
    }
}

function showPrompt() {
    navigator.notification.confirm('De donde deseas obtener la imagen?', onPrompt2,'Alerta', ['Camara', 'Biblioteca']);
}

function ChangeImagePromt(){
    navigator.notification.confirm('Cambiar imagen?',onPrompt1,'Alerta', ['Si', 'No']);
}